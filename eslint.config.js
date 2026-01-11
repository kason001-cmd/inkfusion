import { FlatCompat } from "@eslint/eslintrc"
const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
  recommendedConfig: {
    extends: ["eslint:recommended"],
  },
})

export default [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  }),
  {
    // Project uses React 17+ JSX runtime (Next.js). Don't require React in scope for JSX.
    // Also rely on TypeScript types instead of prop-types.
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
