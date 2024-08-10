/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */
/* eslint-env node */
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["apps/web/tsconfig.*?.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  settings: {
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json", "apps/web/tsconfig.json"],
      },
    },
  },

  // Ignore
  ignorePatterns: ["app/components/ui/*"],

  // Base config
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "prettier/prettier",
    "plugin:tailwindcss/recommended",
  ],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@lexical/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
        rules: {
          "react/jsx-props-no-spreading": "off",
          "react/jsx-filename-extension": "error",
          "react/jsx-wrap-multilines": ["error", { declaration: false, assignment: false }],
          "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
          "react/require-default-props": "off",
          "no-console": ["error", { allow: ["warn", "error"] }],
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import", "unicorn"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "unicorn/no-invalid-remove-event-listener": "error",
        "import/prefer-default-export": "off",
        "consistent-return": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "import/order": [
          "error",
          {
            pathGroups: [
              {
                pattern: "~/**",
                group: "external",
              },
            ],
          },
        ],
        "prettier/prettier": "warn",
        "arrow-body-style": ["error", "as-needed"],
        "no-use-before-define": "off",
        "prefer-arrow-callback": [
          "error",
          {
            allowNamedFunctions: true,
          },
        ],
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
