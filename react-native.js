module.exports = {
  extends: [
    // apply common rules
    './index.js',
    'plugin:react/recommended', // uses react-specific linting rules
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'react-native', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    'react/prop-types': 'off',
    // Unnecessary style
    'react-native/no-unused-styles': 1,
    // Unnecessary array
    'react-native/no-single-element-style-arrays': 2,
    // Inline style
    'react-native/no-inline-styles': 1,
    // Inline function
    'react/jsx-no-bind': 'off',
    // Inefficient component
    'react/require-optimization': 2,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect
    'max-params': ['error', 3],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'react-native/react-native': true,
  },
}
