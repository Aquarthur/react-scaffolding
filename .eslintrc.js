const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["import", "react"],
  rules: {
    quotes: [2, "double", "avoid-escape"],
    "no-use-before-define": [2, { functions: false }],
    "prefer-const": 1,
    complexity: [1, 5],
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(__dirname, "./webpack.config.js"),
      },
    },
  },
};
