# `@reggi/here`

```
npm i @reggi/here -g
```

## Summary 

A CLI tool to create an interface for bash shell commands, auto generates a `--help` list of all available functions, allows for cascading shell function dependency.

## How

Create a folder in a directory called `scripts`.

```bash
mkdir ./scripts
```

Then create a shell command.

```bash
touch ./scripts/0500-hello-world.sh
```

```sh
USAGE='--helloWorld (echo hello world)'
function helloWorld () {
  echo 'hello world'
}
```

Then run `here` in the directory with the `scripts` folder.

You should see this:

```
$ here
Usage: --function <args> [--function <args>]

	--helloWorld (echo hello world)
	--help (shows this help output)
```

Then you can execute the command using the flag:

```
$ here --helloWorld
hello world
```
