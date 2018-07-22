# `@reggi/journey.coerce-to-array`

```
npm i @reggi/journey.coerce-to-array --save
```

## How

This module simply coerces any value to an array, if it's an array already it returns the entered value, not nesting it in another array.

```
import coerceToArray from '@reggi/journey.coerce-to-array'

coerceToArray(1) // => [1]
coerceToArray([1]) // => [1]
coerceToArray('A') // => ['A']
coerceToArray({}) // => [{}]
```
