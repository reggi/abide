import sinon from 'sinon'
import {commandPlusHandler, commandPlus} from './index'

const getArgs = (argv, workingDir) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  stderr: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => workingDir
})

test('commandPlusHandler: string', async () => {
  const args = getArgs([], __dirname)
  const main = () => Promise.resolve('hello')
  await commandPlusHandler({main, ...args})
  expect(args.stderr.write.called).toBe(false)
  expect(args.stdout.write.called).toBe(true)
  expect(args.stdout.write.args).toEqual([['hello\n']])
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('commandPlusHandler: true', async () => {
  const args = getArgs([], __dirname)
  const main = () => true
  await commandPlusHandler({main, ...args})
  expect(args.stderr.write.called).toBe(false)
  expect(args.stdout.write.called).toBe(false)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('commandPlusHandler: false', async () => {
  const args = getArgs([], __dirname)
  const main = () => false
  await commandPlusHandler({main, ...args})
  expect(args.stderr.write.called).toBe(false)
  expect(args.stdout.write.called).toBe(false)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('commandPlusHandler: throw', async () => {
  const args = getArgs([], __dirname)
  const main = () => { throw new Error('error') }
  await commandPlusHandler({main, ...args})
  expect(args.stderr.write.called).toBe(true)
  expect(args.stdout.write.called).toBe(false)
  expect(args.stderr.write.args).toEqual([['error\n']])
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('commandPlusHandler: obj', async () => {
  const args = getArgs([], __dirname)
  const main = () => ({hello: 'world'})
  await commandPlusHandler({main, ...args})
  expect(args.stderr.write.called).toBe(false)
  expect(args.stdout.write.called).toBe(true)
  expect(args.stdout.write.args).toEqual([['{\n  "hello": "world"\n}\n']])
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('commandPlus', async () => {
  const args = getArgs([], __dirname)
  const main = () => Promise.resolve('hello')
  await commandPlus(module, main, args)
  expect(args.stderr.write.called).toBe(false)
  expect(args.stdout.write.called).toBe(true)
  expect(args.stdout.write.args).toEqual([['hello\n']])
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('commandPlus: native process', async () => {
  const main = () => Promise.resolve('hello')
  var processState = process
  process = getArgs([], __dirname) // eslint-disable-line
  await commandPlus(module, main)
  process = processState  // eslint-disable-line
})
