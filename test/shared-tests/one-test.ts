import * as GraphQL from "graphql";
import { EntityCache } from "../../src/entity-cache";
import {
  GraphQLResponse,
  // Entities,
  Variables
} from "../../src/types";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly query: GraphQL.DocumentNode;
  readonly variables?: Variables;
  readonly response: GraphQLResponse;
  readonly entities: EntityCache;
}
