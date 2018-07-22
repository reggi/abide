# `@reggi/help.string-argv`

```
npm i @reggi/help.string-argv --save
```

# Why

Takes a string and uses a child process to stdout the results of `process.argv` as JSON. Uses child process to spawn a Node.js instance so it is very accurate to how node splits it's `argv` string.

```js
import stringArgv from 'help.string-argv'
stringArgv('--name thomas').then(res => console.log) // => ['--name', 'thomas']
```
