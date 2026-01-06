import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint.config.mjs",
  ]),
  {
    languageOptions: {
      ecmaVersion: 11,
      sourceType: "module",
    },

    rules: {
      // turn off the JS rule completely (doesn't understand TS)
      "no-unused-vars": "off",

      // enable the TS rule (respects type-only stuff)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_", // allow unused args if prefixed with _
          varsIgnorePattern: "^_", // allow unused vars if prefixed with _
          ignoreRestSiblings: true,
        },
      ],

      "react/react-in-jsx-scope": "off",

      "react/jsx-filename-extension": [
        2,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off",

      "lines-around-comment": [
        "error",
        {
          beforeLineComment: true,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],

      "newline-before-return": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: ["export"],
          next: ["*"],
        },
        {
          blankLine: "always",
          prev: ["*"],
          next: ["multiline-const", "multiline-let", "multiline-var", "export"],
        },
      ],
    },
  },
]);

export default eslintConfig;
