import sinon from 'sinon'
import resultCli from './index'

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: sinon.spy(() => '/Users/thomas/Desktop/abide-master/packages/results-cli')
})

test('resultCli: else', async () => {
  const args = getArgs([])
  await resultCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('resultCli: silent else', async () => {
  const args = getArgs(['-s'])
  await resultCli(args)
  expect(args.stdout.write.called).toBe(false)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('resultCli: help', async () => {
  const args = getArgs(['--help'])
  await resultCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: version', async () => {
  const args = getArgs(['--version'])
  await resultCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: main', async () => {
  const args = getArgs(['--', 'echo', 'hello'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: with options', async () => {
  const args = getArgs(['-cpedi', '--', 'echo', 'hello'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: with failure exit case', async () => {
  const args = getArgs(['--', 'exit', '1'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('resultCli: with failure exit case', async () => {
  const args = getArgs(['-zu', '--', 'exit', '1'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: with failure no color', async () => {
  const args = getArgs(['--no-color', '--', 'exit', '1'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('resultCli: main with color', async () => {
  const args = getArgs(['--color', '--', 'pwd'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('resultCli: main without color -u', async () => {
  const args = getArgs(['-u', '--', 'pwd'])
  await resultCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})
