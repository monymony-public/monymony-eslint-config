import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import shared from './common';


export default [
    ...shared,
    {
        plugins: {
            // issue: https://github.com/Intellicode/eslint-plugin-react-native/issues/333#issuecomment-2150582430
            "react-native": fixupPluginRules(reactNative),
            "react": react
        },
        languageOptions: {
            globals: {
                ...reactNative.environments["react-native"]["react-native"],
            },
            ecmaVersion: 2020,
            sourceType: "module",
        },
        ...reactHooks.configs.flat.recommended,
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
