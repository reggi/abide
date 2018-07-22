# `@reggi/gitpkg.upsert`

```
npm i @reggi/gitpkg.upsert
```

# Why

> "An operation that inserts rows into a ~~database table~~ [JavaScript object] if they do not already exist, or updates them if they do." -[wiki](https://en.wiktionary.org/wiki/upsert)

# How

```js
import upsert from '@reggi/gitpkg.upsert'

// ----- upsert example ----- 

const resultsOne = upsert([
  {name: 'dolphin', job: 'waffle maker'},
  {name: 'brooke', job: 'youtube watcher'},
  {name: 'birdman', job: 'cellist'}
], {name: 'brooke', job: 'streamer'}, 'name')

// `resultsOne` now equals:

// [
//   {name: 'dolphin', job: 'waffle maker'},
//   {name: 'brooke', job: 'streamer'},
//   {name: 'birdman', job: 'cellist'}
// ]

// ----- insert example ----- 

const resultsTwo = upsert([
  {name: 'dolphin', job: 'waffle maker'},
  {name: 'brooke', job: 'youtube watcher'},
  {name: 'birdman', job: 'cellist'}
], {name: 'sallymae', job: 'banker', cust: true}, 'name'))
  
// `resultsTwo` now equals:

// [
//   {name: 'dolphin', job: 'waffle maker'},
//   {name: 'brooke', job: 'youtube watcher'},
//   {name: 'birdman', job: 'cellist'},
//   {name: 'sallymae', job: 'banker', cust: true}
// ]

```
