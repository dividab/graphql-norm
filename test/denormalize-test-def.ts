import * as GraphQL from "graphql";
import { NormMap } from "../src/norm-map";
import { RootFields, Variables } from "../src/types";

export interface DenormalizeTestDef {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly data: RootFields | undefined;
  readonly normMap: NormMap;
  readonly fields: { readonly [key: string]: ReadonlyArray<string> };
}
