import * as GraphQL from "graphql";

export interface Variables {
  readonly [key: string]: any;
}

export interface ResponseObject {
  readonly [key: string]: any;
}

export interface ResponseObject2 {
  readonly [key: string]: ResponseObjectFieldValue;
}

// export type ResponseObjectPrimitiveValue =
//   | string
//   | number
//   | boolean
//   | ResponseObjectPrimitiveArray;

// export interface ResponseObjectPrimitiveArray
//   extends ReadonlyArray<ResponseObjectPrimitiveValue> {}

export type ResponseObjectFieldValue =
  | string
  | number
  | boolean
  | ResponseObject
  | ResponseObjectArray;

export interface ResponseObjectArray
  extends ReadonlyArray<ResponseObjectFieldValue> {}

export interface RootFields {
  readonly [rootField: string]: any;
}

export interface DenormalizationResult {
  readonly data: RootFields | undefined;
  readonly partial: boolean;
  readonly stale: boolean;
}

export interface FragmentMap {
  readonly [fragmentName: string]: GraphQL.FragmentDefinitionNode;
}
export type DocumentDefinitionTuple = [FragmentMap, FieldNodeWithSelectionSet];

export interface FieldNodeWithSelectionSet extends GraphQL.FieldNode {
  readonly selectionSet: GraphQL.SelectionSetNode;
}

export type GetObjectToIdResult = string | undefined;

export type GetObjectId = (object: {
  readonly id?: string;
  readonly __typename?: string;
}) => GetObjectToIdResult;
