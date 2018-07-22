# `@reggi/dep-merge`

```
npm i @reggi/dep-merge --save
```

## Why 

Built for the CLI tool [`@reggi/dep-merge-cli`](https://github.com/reggi/abide/tree/master/packages/dep-merge-cli), `dep-merge` takes all the dev-dependencies in a `package.json` file and merges them intto dependencies. This can be useful in monorepo setups where nested dev-dependencies aren't installed. 

## Examples

Given a path to a module, the functions below will merge / unmerge dependencies. 

```js
import {depMerge, unDepMerge} from 'dep-merge'

// merges dependencies in module
const depMergeResults = depMerge('./my-module')
  .then(console.log)
  .catch(console.log)

// unmerges dependencies in module
const unDepMergeResults = unDepMerge('./my-module')
  .then(console.log)
  .catch(console.log)
```
