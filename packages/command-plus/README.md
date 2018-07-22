# `@reggi/command-plus`

```
npm i @reggi/command-plus --save
```

## Why

This project is a wrapper around the [`@reggi/command`](https://github.com/reggi/abide/tree/master/packages/command) module that allows functions that return "normal" values to be handled in the console in a consistent way.

* A returned `boolean` of `true` will return with an exit code of `0`
* A returned `boolean` of `false` will return with an exit code of `1`
* A returned `string` will be written to `stdout` with an exit code `0`
* Anything else returned will be `json` stringified with an exit code `0`
* Any thrown error will be caught, the message will be written to `stderr` with an exit code of `1`

## Examples

### `boolean` `false`

```js
import commandPlus from '@reggi/command-plus'

export default commandPlus(module, async () => {
  return false // return with an exit code of `1`
})
```

### `boolean` `true`

```js
import commandPlus from '@reggi/command-plus'

export default commandPlus(module, async () => {
  return true // return with an exit code of `0`
})
```

### `strings`

```js
import commandPlus from '@reggi/command-plus'

export default commandPlus(module, async () => {
  return 'Hello World' // will be written to `stdout` with an exit code `0` 
})
```

### `object`

```js
import commandPlus from '@reggi/command-plus'

export default commandPlus(module, async () => {
  return {greeting: 'Hi"} // will be `json` stringified with an exit code `0`
})
```

### thrown `Error`

```js
import commandPlus from '@reggi/command-plus'

export default commandPlus(module, async () => {
  throw new Error('Not good') // message will be written to `stderr` with an exit code of `1`
})
```
