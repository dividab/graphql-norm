module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  //   extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ]
  }
};
