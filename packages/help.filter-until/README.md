# `@reggi/help.filter-until`

## Why

Function that takes an array and filters using a function, until that function is not met.

## Example

```js
import filterUntil from '@reggi/help.filter-until'
const fn = (value) => value !== 'a'
const d = filterUntil(['a', 'a', 'a', 'a', 'b', 'a', 'a'], fn) // ['a', 'a', 'a', 'a']
```
