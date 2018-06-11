import path from 'path'
import sinon from 'sinon'
import fs from 'fs-extra'
import requireableCli from './index'

jest.setTimeout(10000)

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  exit: sinon.spy()
})

afterEach(async () => {
  await fs.remove(path.join(__dirname, './examples/working/node_modules'))
  await fs.remove(path.join(__dirname, './examples/broken/node_modules'))
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
  const args = getArgs([path.join(__dirname, './examples/working')])
  await requireableCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
}, 10000)

test('requireableCli: working verbose', async () => {
  const args = getArgs([path.join(__dirname, './examples/working'), '--verbose'])
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
