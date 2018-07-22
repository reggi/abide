# `@reggi/journey.is-promise`

```
npm i @reggi/journey.is-promise --save
```

## How

This module checks if a function is a un-resolved promise and returns `true` and `false`.

```js
import isPromise from '@reggi/journey.is-promise'

const promA = async () => true
const promB = () => Promise.resolve(true)
isPromise(true) // => false
isPromise(() => {})) // => false
isPromise(promA())) // => true
isPromise(promB())) // => true
```
