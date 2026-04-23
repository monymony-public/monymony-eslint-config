import shared from './common';
import { monymonyPlugin } from './monymony-plugin';

export default [...shared, {
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: {
        monymony: monymonyPlugin,
    },
    rules: {
        "monymony/resolve-field-in-resolver-class": "error",
        "monymony/graphql-require-input-args-name": "warn",
        "monymony/prefer-input-object-parameter": "warn",
    },
}];
