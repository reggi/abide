# `@reggi/gitpkg.traverse-up`

```
npm i @reggi/gitpkg.traverse-up
```

## Why

Given a file name and a working directory, `traverseUp` will look traverse up the file hierarchy for a given file. This is good to find a folder like `node_modules`, a file like `package.json`, or a `lerna.json` config.

```js
import traverseUp from '@reggi/gitpkg.traverse-up'

;(async () => {
  const packagePath = await traverseUp({
    findPathPattern: 'package.json',
    findTypePattren: 'file',
    workingDir: './c',
    cwd: '/example-alpha/a/b'
  })
})();
```
