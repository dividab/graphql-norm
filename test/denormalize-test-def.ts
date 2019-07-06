import * as GraphQL from "graphql";
import { EntityCache, StaleEntities } from "../src/entity-cache";
import { GraphQLResponse, Variables } from "../src/types";

export interface DenormalizeOneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly response: GraphQLResponse | undefined;
  readonly entities: EntityCache;
  readonly partial: boolean;
  readonly stale: boolean;
  readonly staleEntities: StaleEntities;
}
