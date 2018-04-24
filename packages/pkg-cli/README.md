# `pkg-cli`

## Install

`npm i @reggi/pkg-cli -g`

## Why

Create dynamic package.json files.

## what

The `pkg` command line tool uses a plugin system similar to babel to help generate dynamic `package.json` files.

## Example plugin that uses other plugins

Plugins are fully extensible, meaning you can have a plugin that consumes and uses other plugins to chain them all together. 

Here's an example of plugin `pkg-plugin-cobalt` a preset I made for myself.

```js
import prop from '@reggi/pkg-plugin-prop'
import nameScope from '@reggi/pkg-plugin-name-scope'
import nameDir from '@reggi/pkg-plugin-name-dir'
import babel from '@reggi/pkg-plugin-babel-6-to-node-4'
import jest from '@reggi/pkg-plugin-jest'
import standard from '@reggi/pkg-plugin-standard'
import sort from '@reggi/pkg-plugin-sort'

export default [
  [prop, {
    'author': 'Thomas Reggi',
    'main': './index.build.js',
    'version': '0.0.1',
    'publishConfig': {
      'access': 'public'
    }
  }],
  nameDir,
  [nameScope, '@reggi'],
  babel,
  [jest, {'addBabelJest': true, 'hunderedPercent': true}],
  [standard, {'jest': true, 'babel': true, 'ignore': '*.build.js'}],
  [prop, {'scripts.test': 'npm run standard && npm run jest'}],
  [prop, {'scripts.build': 'npm run babel'}],
  sort
]
```

With this plugin published I can now run and get a `package.json` instantly generated for a specific directory.

```bash
$ pkg --plugin pkg-plugin-cobalt -w
```

## Usage

```bash
$ pkg --help
Usage: pkg

  Generate a package.json based on plugins

  Options:

    --write, -w          writes output to package.json file
    --output, -o         writes output to stdout
    --plugin <module>    path to pkg plugin
    --version, -v        shows the version
    --help, -h           shows this usage output
    --dir, -C <path>     path to use as working directory
    --silent, -s         silent the command
```
