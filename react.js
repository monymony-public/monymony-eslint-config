module.exports = {
  extends: [
    // 'plugin:react/recommended', // already imported in react
  ],
  plugins: [],
  rules: {    
    'react/prop-types': 'off',
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
