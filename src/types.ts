import * as GraphQL from "graphql";

export interface Variables {
  readonly [name: string]: any;
}

export interface ResponseObject {
  readonly [key: string]: any;
}

export interface ResponseObject2 {
  readonly [key: string]: ResponseObjectFieldValue;
}

export type ResponseObjectFieldValue =
  | string
  | number
  | boolean
  | ResponseObject2
  | ResponseObjectArray;

export interface ResponseObjectArray
  extends ReadonlyArray<ResponseObjectFieldValue> {}

export interface RootFields {
  readonly [rootField: string]: any;
}

export interface DenormalizationResult {
  readonly data: RootFields | undefined;
  readonly fields: FieldsMap;
}

export interface FieldsMap {
  readonly [key: string]: ReadonlySet<string>;
}

export interface FragmentMap {
  readonly [fragmentName: string]: GraphQL.FragmentDefinitionNode;
}
export type DocumentDefinitionTuple = readonly [
  FragmentMap,
  FieldNodeWithSelectionSet
];

export interface FieldNodeWithSelectionSet extends GraphQL.FieldNode {
  readonly selectionSet: GraphQL.SelectionSetNode;
}

export type GetObjectToIdResult = string | undefined;

export type GetObjectId = (object: {
  readonly id?: string;
  readonly __typename?: string;
}) => GetObjectToIdResult;

export type ResolveType = (object: { readonly __typename?: string }) => string;
