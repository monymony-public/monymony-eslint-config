import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

export default [
    ...compat.extends("./common.js", "plugin:react/recommended", "plugin:react/jsx-runtime"),
    {
        plugins: {
            react,
            "react-hooks": fixupPluginRules(reactHooks),
        },

        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/prop-types": "off",
            "react/jsx-no-bind": "off",
            "react/require-optimization": 2,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "max-params": ["error", 3],

            "react/self-closing-comp": ["warn", {
                component: true,
                html: true,
            }],
        },
    },
];