import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

// To Support ESM module and CommonJS module
const __filename = typeof __filename !== "undefined"
  ? __filename
  : fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("./common.js"), {
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
}];