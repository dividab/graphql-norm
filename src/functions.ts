import * as GraphQL from "graphql";
import {
  DocumentDefinitionTuple,
  FragmentMap,
  FieldNodeWithSelectionSet,
  GetObjectId,
  Variables,
  GetObjectToIdResult,
  ResponseObject,
  ResolveType
} from "./types";

export function getDocumentDefinitions(
  definitions: ReadonlyArray<GraphQL.DefinitionNode>
): DocumentDefinitionTuple {
  let operationDefinition:
    | GraphQL.OperationDefinitionNode
    | undefined = undefined;

  const fragmentMap: {
    // eslint-disable-next-line functional/prefer-readonly-type
    [fragmentName: string]: GraphQL.FragmentDefinitionNode;
  } = {};
  for (const definition of definitions) {
    switch (definition.kind) {
      case "OperationDefinition":
        operationDefinition = definition;
        break;
      case "FragmentDefinition":
        fragmentMap[definition.name.value] = definition;
        break;
      default:
        throw new Error("This is not an executable document");
    }
  }
  const rootFieldNode: FieldNodeWithSelectionSet = {
    kind: "Field",
    name: {
      kind: "Name",
      value: "data"
    },
    selectionSet: {
      kind: "SelectionSet",
      selections: operationDefinition!.selectionSet.selections
    }
  };
  return [fragmentMap, rootFieldNode];
}

export function expandFragments(
  resolveType: ResolveType,
  obj: ResponseObject,
  selectionNodes: ReadonlyArray<GraphQL.SelectionNode>,
  fragmentMap: FragmentMap
): ReadonlyArray<GraphQL.FieldNode> {
  const fieldNodes: Array<GraphQL.FieldNode> = [];

  for (const selectionNode of selectionNodes) {
    switch (selectionNode.kind) {
      case "Field":
        fieldNodes.push(selectionNode);
        break;
      case "InlineFragment": {
        const fragmentTypeName =
          selectionNode.typeCondition && selectionNode.typeCondition.name.value;
        const objTypeName = resolveType(obj);
        // Only include this fragment if the typename matches
        if (fragmentTypeName === objTypeName) {
          fieldNodes.push(
            ...expandFragments(
              resolveType,
              obj,
              selectionNode.selectionSet.selections,
              fragmentMap
            )
          );
        }
        break;
      }
      case "FragmentSpread": {
        const fragment = fragmentMap[selectionNode.name.value];
        const fragmentTypeName =
          fragment.typeCondition && fragment.typeCondition.name.value;
        const objTypeName = resolveType(obj);
        // Only include this fragment if the typename matches
        if (fragmentTypeName === objTypeName) {
          fieldNodes.push(
            ...expandFragments(
              resolveType,
              obj,
              fragment.selectionSet.selections,
              fragmentMap
            )
          );
        }
        break;
      }
      default:
        throw new Error(
          "Unknown selection node field kind: " + (selectionNode as any).kind
        );
    }
  }
  return fieldNodes;
}

function resolveValueNode(
  valueNode: GraphQL.ValueNode,
  variables: Variables | undefined
): string | boolean | number | ReadonlyArray<any> | object | null {
  switch (valueNode.kind) {
    case "Variable":
      return variables![valueNode.name.value];
    case "NullValue":
      return null;
    case "ListValue":
      return valueNode.values.map(f => resolveValueNode(f, variables));
    case "ObjectValue":
      const valueObject: { [key: string]: any } = {};
      for (const field of valueNode.fields) {
        valueObject[field.name.value] = resolveValueNode(
          field.value,
          variables
        );
      }
      return valueObject;
    default:
      return valueNode.value;
  }
}

export function fieldNameWithArguments(
  fieldNode: GraphQL.FieldNode,
  variables: Variables | undefined
): string {
  const argumentsObject: { [key: string]: any } = {};
  for (const argumentNode of fieldNode.arguments!) {
    argumentsObject[argumentNode.name.value] = resolveValueNode(
      argumentNode.value,
      variables
    );
  }
  const hashedArgs = JSON.stringify(argumentsObject);
  return fieldNode.name.value + "(" + hashedArgs + ")";
}

export const defaultGetObjectId: GetObjectId = (object: {
  readonly id: string;
  readonly __typename?: string;
}): GetObjectToIdResult => {
  return object.id === undefined
    ? undefined
    : `${object.__typename}:${object.id}`;
};

export const defaultResolveType: ResolveType = (object: {
  readonly __typename?: string;
}): string => {
  if (object.__typename === undefined) {
    throw new Error("__typename cannot be undefined.");
  }
  return object.__typename;
};

/**
 * Evaluates  @skip and @include directives on field
 * and returns true if the node should be included.
 */
export function shouldIncludeField(
  directives: ReadonlyArray<GraphQL.DirectiveNode>,
  variables: Variables = {}
): boolean {
  let finalInclude = true;
  for (const directive of directives) {
    let directiveInclude = true;
    if (directive.name.value === "skip" || directive.name.value === "include") {
      if (directive.arguments) {
        for (const arg of directive.arguments) {
          if (arg.name.value === "if") {
            let argValue: boolean;
            if (arg.value.kind === "Variable") {
              argValue = variables && !!variables[arg.value.name.value];
            } else if (arg.value.kind === "BooleanValue") {
              argValue = arg.value.value;
            } else {
              // The if argument must be of type Boolean!
              // http://facebook.github.io/graphql/June2018/#sec--skip
              throw new Error(
                `The if argument must be of type Boolean!, found '${arg.value.kind}'`
              );
            }
            const argInclude =
              directive.name.value === "include" ? argValue : !argValue;
            directiveInclude = directiveInclude && argInclude;
          }
        }
      }
      finalInclude = finalInclude && directiveInclude;
    }
  }
  return finalInclude;
}
