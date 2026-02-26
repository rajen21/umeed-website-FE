import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // reactHooks.configs.flat.recommended,
      // reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser, ecmaVersion: 2020 },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  // tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
]);
