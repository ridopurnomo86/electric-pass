import { fileURLToPath } from "url";
import path from "path";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { includeIgnoreFile } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  includeIgnoreFile(gitignorePath),
  {
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
  }
);
