import mockFs from 'mock-fs'
import sinon from 'sinon'
import pkgCli from './index'

const getArgs = (argv, dir = '/dir') => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: sinon.spy(() => dir)
})

beforeAll(() => {
  jest.mock('./package.json', () => ({version: '0.0.0'}))
  jest.mock('/dir/plugin.js', () => ({
    default: ({pkg = {}, wd, opt} = {}) => {
      return {
        ...pkg,
        name: 'example-plugin'
      }
    }
  }), {virtual: true})
  jest.mock('/dir/error-plugin.js', () => ({
    default: ({pkg = {}, wd, opt} = {}) => {
      throw new Error('error-plugin')
    }
  }), {virtual: true})
})

beforeEach(async () => {
  mockFs({
    '/dir': {
      '.pkgrc': JSON.stringify(['./plugin.js'])
    },
    '/throws': {
      '.pkgrc': JSON.stringify(['./error-plugin.js'])
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('pkgCli: help', async () => {
  const args = getArgs(['--help'])
  await pkgCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('pkgCli: version', async () => {
  const args = getArgs(['--version'])
  await pkgCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('pkgCli', async () => {
  const args = getArgs([])
  await pkgCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('pkgCli', async () => {
  const args = getArgs(['-C', '/throws'])
  await pkgCli(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})
