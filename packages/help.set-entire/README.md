# `@reggi/help.set-entire`

```
npm i @reggi/help.set-entire --save
```

## Why

Takes a flat object where the keys contain periods (`.`) and creates a nested object with those properties.

## Example

```js
  const d = setEntire({
    'example': true,
    'person.firstName': 'Thomas',
    'person.lastName': 'Reggi',
    'person.age': 28
  })

console.log(d.example) // => true
console.log(d.person.firstName) // => 'Thomas'
console.log(d.person.lastName) // => 'Reggi'
console.log(d.person.age) // => 28
```
