import * as GraphQL from "graphql";
import {
  DocumentDefinitionTuple,
  FragmentMap,
  FieldNodeWithSelectionSet,
  GetObjectId,
  Variables
} from "./types";

export function getDocumentDefinitions(
  definitions: ReadonlyArray<GraphQL.DefinitionNode>
): DocumentDefinitionTuple {
  let operationDefinition:
    | GraphQL.OperationDefinitionNode
    | undefined = undefined;

  const fragmentMap: {
    // tslint:disable-next-line:readonly-keyword
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
  selectionNodes: ReadonlyArray<GraphQL.SelectionNode>,
  fragmentMap: FragmentMap
): ReadonlyArray<GraphQL.FieldNode> {
  const fieldNodes: Array<GraphQL.FieldNode> = [];

  for (const selectionNode of selectionNodes) {
    switch (selectionNode.kind) {
      case "Field":
        fieldNodes.push(selectionNode);
        break;
      case "InlineFragment":
        fieldNodes.push(
          ...expandFragments(selectionNode.selectionSet.selections, fragmentMap)
        );
        break;
      case "FragmentSpread":
        const fragment = fragmentMap[selectionNode.name.value];
        fieldNodes.push(
          ...expandFragments(fragment.selectionSet.selections, fragmentMap)
        );
        break;
      default:
        throw new Error(
          "Unknown selection node field kind: " + (selectionNode as any).kind
        );
    }
  }
  return fieldNodes;
}

export function fieldNameWithArguments(
  fieldNode: GraphQL.FieldNode,
  variables: Variables | undefined
): string {
  // tslint:disable-next-line:readonly-keyword
  const argumentsObject: { [key: string]: any } = {};
  // tslint:disable-next-line:no-arguments
  for (const argumentNode of fieldNode.arguments!) {
    argumentsObject[argumentNode.name.value] = resolveValueNode(
      argumentNode.value,
      variables
    );
  }
  const hashedArgs = JSON.stringify(argumentsObject);
  return fieldNode.name.value + "(" + hashedArgs + ")";
}

function resolveValueNode(
  valueNode: GraphQL.ValueNode,
  variables: Variables | undefined
): string | boolean | number | Array<any> | Object | null {
  switch (valueNode.kind) {
    case "Variable":
      return variables![valueNode.name.value];
    case "NullValue":
      return null;
    case "ListValue":
      return valueNode.values.map(f => resolveValueNode(f, variables));
    case "ObjectValue":
      // tslint:disable-next-line:readonly-keyword
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

export const defaultGetObjectId: GetObjectId = (
  object: {
    readonly id: string;
    readonly __typename?: string;
  },
  path: ReadonlyArray<string>
): string => {
  if (object.__typename === undefined) {
    throw new Error("Required field __typename is missing");
  }

  if (object.id === undefined) {
    return path.join(".");
  }
  return `${object.__typename};${object.id}`;
};
