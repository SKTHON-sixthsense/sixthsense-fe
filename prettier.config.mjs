/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const prettierConfig = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 100,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  quoteProps: "as-needed",
  bracketSpacing: true,
  useTabs: false,
  htmlWhitespaceSensitivity: "ignore",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default prettierConfig;
