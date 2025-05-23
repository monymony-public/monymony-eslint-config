import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from 'eslint-plugin-import';

export default tsEslint.config(
      {
        ignores: [
            "./node_modules/**"
        ]
      },
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      {
        plugins: {
            prettier,
            "unused-imports": unusedImports,
        },
        rules: {
            // TODO: This rule is not working for now
            // 'prettier/prettier': 'warn',
            'padding-line-between-statements': [
            'warn',
            {blankLine: 'always', prev: '*', next: 'return'},
            // Always require blank lines after directive (like 'use-strict'), except between directives
            {blankLine: 'always', prev: 'directive', next: '*'},
            {blankLine: 'any', prev: 'directive', next: 'directive'},
            // Always require blank lines after import, except between imports
            {blankLine: 'always', prev: 'import', next: '*'},
            {blankLine: 'any', prev: 'import', next: 'import'},
            // Always require blank lines before and after every sequence of variable declarations and export
            {
                blankLine: 'always',
                prev: '*',
                next: ['const', 'let', 'var', 'export'],
            },
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var', 'export'],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var', 'export'],
                next: ['const', 'let', 'var', 'export'],
            },
            // {
            //   blankLine: 'always',
            //   prev: ['multiline-const', 'multiline-expression', 'multiline-let'],
            //   next: '*',
            // },
            // {
            //   blankLine: 'always',
            //   prev: '*',
            //   next: ['multiline-const', 'multiline-expression', 'multiline-let'],
            // },
            // Always require blank lines before and after class declaration, if, do/while, switch, try
            {
                blankLine: 'always',
                prev: '*',
                next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
            },
            {
                blankLine: 'always',
                prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'],
                next: '*',
            },
            ],
            "no-return-await": "off",
            'no-useless-catch': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
            'warn',
            {vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_'},
            ],
            // import plugins
            'import/no-unresolved': 'error',
            'import/no-unused-modules': 'error',
            // "import/named": "error",
            'import/namespace': 'error',
            // "import/default": "error",
            'import/export': 'error',
            'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                alphabetize: {
                order: 'asc',
                },
            },
            ],
            semi: ['error', 'never'],
            'object-curly-spacing': ['error', 'never'],
            'no-nested-ternary': 'warn',
            'spaced-comment': ['warn', 'always', {exceptions: ['-', '+']}],
            'no-console': 'warn',
            'default-param-last': 'warn',
            curly: ['warn', 'all'],
            'prefer-arrow-callback': 'warn',
            // specify the maximum length of a line in your program
            // https://eslint.org/docs/rules/max-len
            'max-len': [
              'error',
              {
                code: 100, 
                tabWidth: 2, 
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
              },
            ],
        }
      },
      {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsEslint.parser,
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
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-empty-object-type": "off",
        },
        settings: {
            'import/resolver': {
              typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
              },
              moduleDirectory: ["node_modules", "./"],
            },
        },
      },
);
