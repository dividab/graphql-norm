module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "functional"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "functional/prefer-readonly-type": ["error", { allowLocalMutation: true }],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/array-type": ["error", "generic"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ]
  }
};
