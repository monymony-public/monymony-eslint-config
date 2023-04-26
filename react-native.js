module.exports = {
  extends: [
    // 'plugin:react/recommended', // already imported in react
  ],
  plugins: [],
  rules: {    
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
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
