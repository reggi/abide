# `results-cli`

## Install

`npm i @reggi/results-cli -g`

![terminal example](https://media.giphy.com/media/2uIfjAenZrheOkHSDd/giphy.gif)

## Why

View the exit code of any given command.

## How

```bash
$ results -- echo "hello"
success
$ results -- exit 1
failure
```

## Usage

```
$ results --help

Usage: results [-- <args>...]

  print clear exit code from command

  Options:

    -u, --no-color      hide color
    -i, --inherit       inherit stdin
    -C, --dir <path>    working directory to use
    -c, --command-show  prints command evaluted
    -p, --path-show     prints current working path
    -d, --dir-show      prints current working directory
    -e, --exit-show     shows the Exit code
    -z, --zero          overwrites passed exit code with 0
    -v, --version       output the version number
    -s, --silent        hide output from this command
    -h, --help          show this output
```
