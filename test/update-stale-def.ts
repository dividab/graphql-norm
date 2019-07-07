import { NormMap } from "../src/entity-cache";
import { StaleEntities } from "../src/stale";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly cache: NormMap;
  readonly staleBefore: StaleEntities;
  readonly staleAfter: StaleEntities;
}
