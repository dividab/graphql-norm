import { EntityCache } from "../src/entity-cache";
import { StaleEntities } from "../src/stale";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly cache: EntityCache;
  readonly staleBefore: StaleEntities;
  readonly staleAfter: StaleEntities;
}
