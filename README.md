# Install

# How to use

```
"extends": [
  ...,
  "@monymony/eslint-config",
  "@monymony/eslint-config/backend"
]
```

# Example eslint config. 
```
"extends": [
  "react-app",
  "react-app/jest",
  "@monymony/eslint-config",
  "@monymony/eslint-config/react"
]
```

```
"extends": [
  ...,
  "@monymony/eslint-config",
  "@monymony/eslint-config/backend"
]
```
# Local Test

1. Plugin root: `yarn link`
2. In the example project: `yarn link @monymony/eslint-config`
3. Run `yarn lint`

# Refer

Multiple configs: https://github.com/AlloyTeam/eslint-config-alloy