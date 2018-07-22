# `@reggi/journey.fn-free`

```
npm i @reggi/journey.fn-free --save
```

## Why

This module takes a `function` and a `resolver`, and passes the value of the function into the resolver. The result of the function is a function that returns the result of the `resolver`. However you can pass in an array of strings that will map to methods attached to the returned function that have the ability to return the un-resolved value of the original function. This is named `fn-free` because it allows the ability to wrap a function but still have access to it's original value.

This is a convoluted concept, but was designed for the [`journey` module](https://github.com/reggi/abide/tree/master/packages/journey) where access to the variables defined is available, but the intended return value is also available. This is a programming concept that is not very established, or at least I haven't really found it in my research.

```js
const animal = () => 'tiger'
const result = fnFree(animal, (animal) => `bengal ${animal}`, ['journey'])
expect(result()).toBe('bengal tiger')
expect(result.journey()).toBe('tiger')
 ```
