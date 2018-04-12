import {throwNewError} from './index'

test('throws', () => {
  expect(() => {
    throwNewError('hello world')
  }).toThrow('hello world')
})

test('throws error', () => {
  expect(() => {
    throwNewError('hello world', Error)
  }).toThrow('hello world')
})
