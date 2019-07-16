import { StaleMap } from "../src/stale";

export interface OneTest {
  readonly name: string;
  readonly only?: boolean;
  readonly skip?: boolean;
  readonly fields: { readonly [key: string]: ReadonlyArray<string> };
  readonly staleMap: StaleMap;
  readonly isStale: boolean;
}
