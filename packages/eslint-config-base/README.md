# @typographist/eslint-config-base

1. Install eslint

```bash
yarn add @typographist/eslint-config-base/eslint-config -D
```

2. Install the correct versions of each package, which are listed by the command:

```bash
yarn info "@typographist/eslint-config-base/eslint-config" peerDependencies
```

3. Install all dependecies:

```bash
npx install-peerdeps --dev @typographist/eslint-config-base/eslint-config
```

4. Add next line to your `.eslintrc` or `.eslintrc.js` or `.eslint.config.js`:

```json
{
  "extends": "@typographist/eslint-config-base/eslint-config"
}
```
