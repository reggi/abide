# `requireable-cli`

## Install

`npm i @reggi/requireable-cli -g`

## Demo

![terminal example](./screenshots/example-1.gif)

## Why

When publishing tests can pass but when the module is required it can throw an error. This is a tool to prevent that from happening before you publish your next module.

* Check and see if a given module will throw errors when it's required. 
* Check for babel errors (missing runtime).
* Check for missing dependencies.

## Usage

```bash
$ requireable --help

Usage: requireable [flags] [modulePath]

  Check and see if a module is requireable in node

  Options:

    --module <path>        path to the local module
    --node <path>          path to the node binary
    --verbose              show debug content
    --inherit, -i          show debug content
    --help, -h             generate this output
    --version, -v          show version number
    --silent, -s           no output
```
