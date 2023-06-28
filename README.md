Do not use it. Not finished yet. 

# Install

# How to use

- Remove your prettier config or set as [Prettier config](./.prettierrc.js).

- Set your eslint config.
```
"extends": [
  ...,
  "@monymony/eslint-config", // should be set.
  "@monymony/eslint-config/backend" // optional for environment.
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
