import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.ts"] },
  // pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];