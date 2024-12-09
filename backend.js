module.exports = {
  extends: [
    './shared.js', // uses typescript-specific linting rules
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
}
