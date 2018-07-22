# `@reggi/dep-pointer`

## Summary

> This is a two-part-module [@reggi/dep-pointer-cli](https://github.com/reggi/abide/tree/master/packages/dep-pointer-cli).

> This is a CLI tool / Node.js function built to be used with monorepos using [`lerna`](https://github.com/lerna/lerna).

[`lerna`](https://github.com/lerna/lerna) has an undocumented feature where it converts a `package.json` file where `dependencies` with a file-specifiers (`file://../my-package`) are swapped for the version that the actual package reference is set to.

For instance this line in `package.json`:

```
"@reggi/journey": "file:../journey"
```

Would be switched to something like this right before the module was published:

```
"@reggi/journey": "2.18.23"
```

# How

This module will search for the directory where a lerna configuration file exists, and use that as a point of reference, then it creates a backup of the `package.json` and changes all the specifiers in all the pacakges. The function is async. Below are some examples.

```js
import depPointer from '@reggi/dep-pointer'

depPointer({workingDir}) // with no arguments but in directory with package
depPointer({workingDir, backupLocal: false}) // with no arguments but in directory with package (no backup)
depPointer({workingDir, packageName: 'module-three'}) // in parent dir with passed in updatePackage
depPointer({workingDir, all: true}) // updateAll
depPointer({workingDir, changed: true}) // updateChanged
```
