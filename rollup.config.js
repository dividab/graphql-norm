/**
 * Rollup Config.
 */
// @ts-check

import rollupPluginCommonjs from "rollup-plugin-commonjs";
import rollupPluginTypescript from "rollup-plugin-typescript2";

const common = {
  input: "src/index.ts",

  treeshake: {
    annotations: true,
    moduleSideEffects: ["array.prototype.flatmap/auto.js"],
    propertyReadSideEffects: false
  }
};

const cjs = {
  ...common,

  output: {
    dir: "./dist",
    entryFileNames: "[name].js",
    chunkFileNames: "common/[hash].js",
    format: "cjs",
    sourcemap: false
  },

  plugins: [
    rollupPluginCommonjs(),
    rollupPluginTypescript({
      tsconfigOverride: { compilerOptions: { target: "es5" } }
    })
  ]
};

const esm = {
  ...common,

  output: {
    dir: "./dist",
    entryFileNames: "[name].mjs",
    chunkFileNames: "common/[hash].mjs",
    format: "esm",
    sourcemap: false
  },

  plugins: [
    rollupPluginCommonjs(),
    rollupPluginTypescript({
      tsconfigOverride: { compilerOptions: { target: "es2017" } }
    })
  ]
};

export default [cjs, esm];
