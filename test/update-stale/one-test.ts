import { EntityCache, StaleEntities } from "../../src/entity-cache";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly cache: EntityCache;
  readonly staleBefore: StaleEntities;
  readonly staleAfter: StaleEntities;
}
