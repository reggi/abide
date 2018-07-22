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
