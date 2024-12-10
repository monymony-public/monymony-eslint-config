import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import shared from './common';

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
    ...compat.extends("plugin:react/recommended", "plugin:react/jsx-runtime"),
    ...shared,
    {
        plugins: {
            react,
            "react-native": reactNative,
            "react-hooks": fixupPluginRules(reactHooks),
        },
        languageOptions: {
            globals: {
                ...reactNative.environments["react-native"]["react-native"],
            },
            ecmaVersion: 2020,
            sourceType: "module",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": ["warn", {
                allowExpressions: true,
            }],
            "react/prop-types": "off",
            "react-native/no-unused-styles": 1,
            "react-native/no-single-element-style-arrays": 2,
            "react-native/no-inline-styles": 1,
            "react/jsx-no-bind": "off",
            "react/require-optimization": 2,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "max-params": ["error", 3],
            "react/self-closing-comp": ["warn", {
                component: true,
                html: true,
            }],
        },
    },
];