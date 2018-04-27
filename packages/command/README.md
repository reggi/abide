# `@reggi/command`

```bash
npm i @reggi/command
```

# Why

I struggled with writing unit tests for my CLI tools. I tried to build out ways of mocking the process variable completley. I have tried every npm module that attempts to mock `stido` correctly, (the only one that does a good job is [TylorS/stdio-mock](https://github.com/TylorS/stdio-mock). But even when `stdio` is mocked jest still had issues when an actual `process.exit` would be called. The main way to mock that is to overwrite process. Rather then doing that I've gone in the opposite direction with this:

```js
const command = (m, fn) => {
  if (require.main === m) {
    return fn(process)
  } else {
    return fn
  }
}
```

This is a simple way to wrap any function that uses process. What this conditional does is this:

* if it is required / imported the function is returned 
* if it is run through the command line the function is executed and `process` is passed in.

This allows for this:

```js
export default command(module, ({stdout, exit}) => {
  stdout.write('hello world' + '\n')
  return exit(0)
})
```

Writing a simple test for this is easy because you can pass in stub / spy functions for the process properties you use (sinon rocks for this).

```js
import {spy} from 'sinon'
import simpleCli from './index'

test('simpleCli', () => {
  const p = {stdout: {write: spy()}, exit: spy()}
  simpleCli(p)
  expect(p.stdout.write.called).toBeTruthy()
  expect(p.exit.called).toBeTruthy()
})
```
