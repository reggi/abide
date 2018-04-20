const sinon = require('sinon')
const command = require('./index')

test('command: a', () => {
  const s = sinon.spy()
  const r = command(false, s)
  expect(typeof r).toEqual('function')
  expect(r).toEqual(s)
})

test('command: b', () => {
  const s = sinon.spy()
  const r = command(module, s)
  expect(typeof r).toEqual('undefined')
  expect(r).not.toEqual(s)
})
