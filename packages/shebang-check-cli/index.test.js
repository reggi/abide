import shebangCheckCli from './index'
import mockFs from 'mock-fs'
import sinon from 'sinon'

const getArgs = (argv, workingDir) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  stderr: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => workingDir
})

beforeEach(async () => {
  mockFs({
    '/empty-package': {
      'package.json': JSON.stringify({})
    },
    '/invalid-array-bin-package': {
      'package.json': JSON.stringify({bin: ['index.js']})
    },
    '/invalid-shebang': {
      'index.js': 'var hello = \'Thomas\'',
      'package.json': JSON.stringify({bin: 'index.js'})
    },
    '/working-bin-prop-string': {
      'index.js': '#!/usr/bin/env node',
      'package.json': JSON.stringify({bin: 'index.js'})
    },
    '/working-bin-prop-object': {
      'index.js': '#!/usr/bin/env node',
      'package.json': JSON.stringify({bin: {assignment: 'index.js'}})
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('shebangCheckCli: help', async () => {
  const args = getArgs(['--help'])
  await shebangCheckCli(args)
  expect(args.stdout.write.called).toBeTruthy()
  expect(args.exit.called).toBeTruthy()
  expect(args.stdout.write.firstCall.args).toMatchSnapshot()
  expect(args.exit.firstCall.args).toEqual([0])
})

test('shebangCheckCli: version', async () => {
  const args = getArgs(['--version'])
  await shebangCheckCli(args)
  expect(args.stdout.write.called).toEqual(true)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
})

test('shebangCheckCli: success', async () => {
  const args = getArgs(['--dir', '/working-bin-prop-object'])
  await shebangCheckCli(args)
  expect(args.stdout.write.called).toEqual(false)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
})

test('shebangCheckCli: failure', async () => {
  const args = getArgs(['--dir', '/invalid-shebang'])
  await shebangCheckCli(args)
  expect(args.stdout.write.called).toEqual(false)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})
