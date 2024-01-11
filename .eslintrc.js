module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "no-undef": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-multi-spaces": ["error"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": "error",
    "no-multiple-empty-lines": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": ["error", { vars: "all" }],
  },
  globals: {
    React: true,
    JSX: true,
  },
};
