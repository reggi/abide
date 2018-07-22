# `@reggi/journey.coerce-to-plain-object`

```
npm i @reggi/journey.coerce-to-plain-object --save
```

## How

This module coverts anything into an object.

```js
import coerceToPlainObject from 'journey.coerce-to-plain-object'

coerceToPlainObject({}) // => {}
coerceToPlainObject({'a': 'a'}) // => {'a': 'a'}
coerceToPlainObject([]) // => {}
coerceToPlainObject(1) // => {}
```
