module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    "react": { version: "18.2" },
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx", ".scss", ".css"],
        map: [["@", "./src"]]
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  plugins: ["react", "prettier", "react-hooks", "prettier-plugin-tailwindcss"],
  rules: {
    "react/jsx-no-target-blank": "off",
    // "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
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
    "camelcase": "off",
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
    "no-use-before-define": ["error", { functions: false, classes: true, variables: false }],
    "no-unused-vars": [
      1,
      {
        ignoreRestSiblings: false
      }
    ]
  }
};
