# `@reggi/journey.fn-reduce`

```
npm i journey.fn-reduce --save
```

# Why

This module is designed to reduce an array of functions that return objects, the returned objects are merged into one object, this allows for the abilty to have access to any variables defined in a stack.

# Examples

```js
import fnReduce from 'journey.fn-reduce'

const results = fnReduce([
  () => ({name: 'thomas'}),
  () => ({age: '29'}),
  ({name, age}) => ({return: name + age})
]) 

console.log(results()) // => { name: 'Thomas', age: '29', return: 'Thomas29' }
```

This also works with a promise in the stack:

```js
import fnReduce from 'journey.fn-reduce'

const results = fnReduce([
  () => ({name: 'thomas'}),
  async () => ({age: '29'}),
  ({name, age}) => ({return: name + age})
])

results().then(console.log) // => { name: 'Thomas', age: '29', return: 'Thomas29' }
```
