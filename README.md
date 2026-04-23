# Monymony ESLint Config

ESLint configuration for Monymony projects.

## Features

- Common ESLint configuration
- Backend-specific configuration
- React-specific configuration
- React Native-specific configuration
- TypeScript support
- Prettier integration
- Custom backend convention rules for Monymony GraphQL/Nest style

## Backend Convention Rules

The `@monymony/eslint-config/backend` export now includes custom Monymony rules:

- `monymony/resolve-field-in-resolver-class` (`error`)
  - Requires `@ResolveField()` to live in a `@Resolver()` class instead of inside `@ObjectType()` / payload classes.
- `monymony/graphql-require-input-args-name` (`warn`)
  - Prefers `@Args('input') input: XxxInput` for business args in `@Query()` / `@Mutation()` methods.
  - Keeps common relay-ish legacy argument containers such as `ConnectionWhereArguments` allowed for gradual adoption.
- `monymony/prefer-input-object-parameter` (`warn`)
  - Prefers a single `input` object parameter for public methods in `*ServiceImpl`, `*UseCase`, `*Gateway`, and `*Repository` classes.

## Installation

```bash
npm install @monymony/eslint-config
```

## Usage

### Common Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@monymony/eslint-config/common']
};
```

### Backend Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@monymony/eslint-config/backend']
};
```

### React Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@monymony/eslint-config/react']
};
```

### React Native Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@monymony/eslint-config/react-native']
};
```

## Version

Current version: 0.5.6

## License

ISC

# Install

- Remove your prettier config or set as [Prettier config](./.prettierrc.js).
- Install this package. `yarn add -D @monymony/eslint-config`

- Set your eslint config.
```
"extends": [
  ...,
  "@monymony/eslint-config", // should be set.
  "@monymony/eslint-config/backend" // optional for environment.
]
```

# Examples. 

React
```
"extends": [
  "react-app",
  "react-app/jest",
  "@monymony/eslint-config",
  "@monymony/eslint-config/react"
]
```

Backend
```
"extends": [
  ...,
  "@monymony/eslint-config",
  "@monymony/eslint-config/backend"
]
```

React Native
```
"extends": [
  "react-app",
  "react-app/jest",
  "@monymony/eslint-config",
  "@monymony/eslint-config/react-native"
]
```



# Local Test

1. Plugin root: `yarn link`
2. In the example project: `yarn link @monymony/eslint-config`
3. Run `yarn lint`

# Publish

- Bump version PR will be created when we push to `release` branch.
- Tagging and publishing to npm will be triggered by pushing `main` branch. 

# Refer

Multiple configs: https://github.com/AlloyTeam/eslint-config-alloy
