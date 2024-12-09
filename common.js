import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
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
    {
        ignores: ["**/.eslintrc.js", "**/node_modules/"]
    }, 
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
    {
        plugins: {
            prettier,
            unusedImports,
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            "prettier/prettier": "warn",
            "padding-line-between-statements": ["warn", {
                blankLine: "always",
                prev: "*",
                next: "return",
            }, {
                blankLine: "always",
                prev: "directive",
                next: "*",
            }, {
                blankLine: "any",
                prev: "directive",
                next: "directive",
            }, {
                blankLine: "always",
                prev: "import",
                next: "*",
            }, {
                blankLine: "any",
                prev: "import",
                next: "import",
            }, {
                blankLine: "always",
                prev: "*",
                next: ["const", "let", "var", "export"],
            }, {
                blankLine: "always",
                prev: ["const", "let", "var", "export"],
                next: "*",
            }, {
                blankLine: "any",
                prev: ["const", "let", "var", "export"],
                next: ["const", "let", "var", "export"],
            }, {
                blankLine: "always",
                prev: "*",
                next: ["if", "class", "for", "do", "while", "switch", "try"],
            }, {
                blankLine: "always",
                prev: ["if", "class", "for", "do", "while", "switch", "try"],
                next: "*",
            }],

            "no-useless-catch": "off",
            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": ["warn", {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            }],

            "import/no-unresolved": "error",
            "import/no-unused-modules": "error",
            "import/namespace": "error",
            "import/export": "error",

            "import/order": ["error", {
                groups: ["builtin", "external", "parent", "sibling", "index"],

                alphabetize: {
                    order: "asc",
                },
            }],

            semi: ["error", "never"],
            "object-curly-spacing": ["error", "never"],
            "no-nested-ternary": "warn",
            "spaced-comment": ["warn", "always", {
                exceptions: ["-", "+"],
            }],
            "no-console": "warn",
            "default-param-last": "warn",
            curly: ["warn", "all"],
            "prefer-arrow-callback": "warn",

            "max-len": ["error", {
                code: 100,
                tabWidth: 2,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            }],
        },
    }, {
        files: ["**/*.ts", "**/*.tsx"],

        plugins: {
            "@typescript-eslint": typescriptEslintEslintPlugin,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },

        rules: {
            "@typescript-eslint/consistent-type-imports": ["warn", {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            }],

            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/ban-ts-ignore": "off",
            "@typescript-eslint/indent": "off",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/explicit-member-accessibility": 0,
            "@typescript-eslint/member-delimiter-style": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-inferrable-types": "off",

            "@typescript-eslint/naming-convention": ["error", {
                selector: "parameter",
                format: ["camelCase"],
                leadingUnderscore: "allow",
            }, {
                selector: "interface",
                format: ["PascalCase"],

                custom: {
                    regex: "^[A-Z]Interface",
                    match: false,
                },
            }],
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": ["warn", {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            }],
            "no-return-await": "off",
        },
}];