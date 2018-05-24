# `dep-pointer`

Lerna has an undocumented feature where it converts a `package.json` file where dependencies with a file-specifiers are swapped for the version that the actual package reference is set to. 

For instance this line in `package.json`:

```
"@reggi/journey": "file:../journey"
```

Would be switched to something like this right before the module was published:

```
"@reggi/journey": "2.18.23"
```

Lerna does not however allow this functionaly through their `cli` tool.

That's the point of this package.
