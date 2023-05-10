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
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    // Inefficient component
    'react/require-optimization': 2,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
