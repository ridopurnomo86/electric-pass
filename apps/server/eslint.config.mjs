import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  plugins: {
    import: importPlugin,
  },
  rules: {
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
    "arrow-body-style": ["error", "as-needed"],
    "no-use-before-define": "off",
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
      },
    ],
  },
  ignores: ["node_modules/*", "build/**/*", "dist/**/*", "**/.dist/", ".dist/"],
});
