# `dep-merge-cli`

## Install

`npm i @reggi/dep-merge-cli -g`

## What

This module has two features.

1. `--merge` updates package.json to include all `devDependencies` in `dependencies`
2. `--unmerge` reverts changes made by the `--merge command.

## Why

This module was created in direct response to [this feature request](https://github.com/npm/npm/issues/20160) to `npm`.

## Usage

```bash
$ dep-merge --help

Usage: dep-merge

  Tool for merging devDependencies into dependencies

  Options:

    --merge                merges devDependencies into dependencies
    --unmerge              unmerges devDependencies from dependencies
    --path, -C <path>      path to node module directory
    --help, -h             generate this output
    --version, -v          show version number
    --silent, -s           log no output
```
