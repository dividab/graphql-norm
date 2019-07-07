import { NormMap } from "../src/norm-map";
import { StaleMap } from "../src/stale";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly normMap: NormMap;
  readonly staleBefore: StaleMap;
  readonly staleAfter: StaleMap;
}
