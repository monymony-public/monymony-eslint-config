import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import shared from "./common";


export default [
    ...shared,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
        },
        // settings: {
        //     react: {
        //         version: "detect",
        //     },
        // },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            "react/prop-types": "off",
            "react/jsx-no-bind": "off",
            "react/require-optimization": 2,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "max-params": ["error", 3],
            "react/self-closing-comp": ["warn", {
                component: true,
                html: true,
            }],
            ...reactHooks.configs.recommended.rules
        },
    },
];