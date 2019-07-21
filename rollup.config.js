/**
 * Rollup Config.
 */
// @ts-check

const common = {
  input: "lib/index.js"
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

  plugins: []
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

  plugins: []
};

export default [cjs, esm];
