import * as GraphQL from "graphql";
import { EntityCache } from "../src/entity-cache";
import { Variables, RootFields } from "../src/types";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly data: RootFields;
  readonly entities: EntityCache;
}
