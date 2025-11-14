module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
        map: [["@", "./src"]]
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
        moduleDirectory: ["node_modules", "src/"]
      },
      typescript: {
        project: "./tsconfig.json"
      }
    }
  },
  plugins: ["@typescript-eslint", "react", "prettier", "react-hooks"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "no-mixed-spaces-and-tabs": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        controlComponents: ["input"]
      }
    ],
    "import/no-unresolved": [0, "never", { caseSensitive: false }],
    "import/extensions": [0, "never"],
    "react/react-in-jsx-scope": "off",
    camelcase: "off",
    "react/prop-types": "off",
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/default-props-match-prop-types": [0, { allowRequiredDefaults: true }],
    "no-param-reassign": 0,
    "react/no-array-index-key": 0,
    "react/jsx-props-no-spreading": 0,
    "import/order": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-shadow": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true, variables: false }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_"
      }
    ]
  }
};
