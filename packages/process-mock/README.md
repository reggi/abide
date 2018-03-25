## Example without `jest`

```js
delete require.cache[require.resolve('./index.js')]
process = processOverwrite('james franco', ['franco', 'dean'])
require('./index')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 0)
assert.equal(process.stdout.write.called, true)
assert.equal(process.stdout.write.args.slice(-1)[0][0], 'james dean')
storage.push(process.stdout.write.args)
```

## Example Mocking global `process`

```js
const preserve = processPreserve()

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
  processReset(preserve)
})

test('replace-cli: example [james franco] to [james dean]', () => {
  process = processOverwrite('james franco', ['franco', 'dean'])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})
```

## Example Mocking required `./process`

```js
afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

test('replace-cli: example [james franco] to [james dean]', () => {
  const mock = processMock('james franco', ['franco', 'dean'])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(0)
  expect(mock.stdout.write.called).toEqual(true)
  expect(mock.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})
```
