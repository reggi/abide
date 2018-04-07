* [ ] Create `pkg-plugin-nyc` with babel support
* [ ] Create `pkg-plugin-test-node-assert` with `nyc` support
* [ ] Create `stdio` (desc. stand-alone copy of nodes internal process/stdio module)
* [ ] Create `meet-stdout-cli` (desc. assert stout easily)
* [ ] Create `meet-semver-cli` (desc. assert stout is semver valid)
* [ ] Create `command-available-cli` (desc. assert command is available)
* [ ] Create `path-valid-cli` (desc. assert path is file or dir)
* [ ] Create `path-valid-dir-cli` (desc. assert path is dir)
* [ ] Create `path-valid-file-cli` (desc. assert path is file)
* [ ] Create `replace-cli` (desc. node string replace using stdin / stdout)
* [ ] Create `npm-deps-cli` with support to check @latest and `file://` reference
* [ ] Create `lerna-publish-needed-cli` (desc. only publish a module and it's `file://` deps)
* [ ] Create `private-public-cli` (desc. stdout the paths of a module and it's `file://` deps)
* [ ] Create `pathname-cli` (desc. get the pathname of a given directory)
* [ ] Create `git-remotes-cli` (desc. stdout the git remote)
* [ ] Create `git-init-dir-cli` (desc. recursivley gets the git dir of a path)
* [ ] Create `pkg-plugin-repo` (desc. add the repo dynamically to package.json using recursion)
* [ ] Create `system-cli` (ex. `system --linux`) (ex. `system --mac`)
* [ ] Create `is-set-cli` (ex. `is-set $VARIABLE`)
* [ ] Create `tjr-cli` (ex. `tjr system --darwin && tjr is-set $NODE_ && tjr meet-stdout `node -v` "6.8.0\n"`)

## Help options

given "--exec npm run start --hello echo hi"

### Specify Booleans (Without split _)

```js
{
  "--exec": true,
  "--hello": true,
  _:[
    "npm run start",
    "echo hi"
  ]
}
```

Alt with split _

```js
{
  "--exec": true,
  "--hello": true,
  _:[
    "npm",
    "run",
    "start",
    "echo",
    "hi"
  ]
}
```

### Specify One Space (Without split _)

```js
{
  "--exec": 'npm',
  "--hello": 'echo',
  _:[
    "run start",
    "hi"
  ]
}
```

Alt with split _

```js
{
  "--exec": true,
  "--hello": true,
  _:[
    "run",
    "hi"
  ]
}
```

### Specify Until next flag

```js
{
  "--exec": 'npm run start',
  "--hello": 'echo hi'
}
```

### `flattenLoose` flag

For splitting `_` perhaps this is a better default syntax 

```js
{
  _:[
    ["npm", "run", "start"],
    ["echo", "hi"]
  ]
}
```

Then It can be `flattend` if desired

```js
{'flattenLoose': true}
```
