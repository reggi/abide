import sinon from 'sinon'
import fs from 'fs-extra'
import requireableCli from './index'

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  exit: sinon.spy()
})

afterEach(async () => {
  await fs.remove('./examples/working/node_modules')
  await fs.remove('./examples/broken/node_modules')
})

test('requireableCli: help', async () => {
  const args = getArgs(['--help'])
  await requireableCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('requireableCli: version', async () => {
  const args = getArgs(['--version'])
  await requireableCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('requireableCli: working example', async () => {
  const args = getArgs(['./examples/working'])
  await requireableCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
}, 10000)

test('requireableCli: working verbose', async () => {
  const args = getArgs(['./examples/working', '--verbose'])
  await requireableCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
}, 10000)

test('requireableCli: else path, no args', async () => {
  const args = getArgs([])
  await requireableCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})
