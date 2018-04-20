import mzFs from 'mz/fs'
import fsExtra from 'fs-extra'
import mockFs from 'mock-fs'
import sinon from 'sinon'
import depMerge from './index'
const fs = {...fsExtra, ...mzFs}

const getArgs = (argv) => ({
  argv,
  stdout: {write: sinon.spy()},
  exit: sinon.spy()
})

const examplePackage = {
  'devDependencies': {
    'a': '*',
    'b': '*',
    'c': '*'
  },
  'dependencies': {
    'doe': '*',
    'rae': '*',
    'mi': '*'
  }
}

const examplePackageExpected = {
  'temporary-file:deletion-prevention': 'temporary-file:deletion-prevention',
  'devDependencies': {
    'a': '*',
    'b': '*',
    'c': '*'
  },
  'dependencies': {
    'doe': '*',
    'rae': '*',
    'mi': '*',
    'a': '*',
    'b': '*',
    'c': '*'
  }
}

beforeEach(() => {
  jest.mock('./package.json', () => ({version: '0.0.0'}), {virtual: true})
  mockFs({
    '/no-module': {},
    '/invalid-package': {
      'package.json': {}
    },
    '/my-module': {
      'package.json': JSON.stringify(examplePackage)
    }
  })
})

afterEach(async () => {
  mockFs.restore()
  depMerge.__ResetDependency__('depMerge')
  depMerge.__ResetDependency__('unDepMerge')
})

test('dep-merge-cli: help', async () => {
  const args = getArgs(['node', './index', '--help'])
  await depMerge(args)
  expect(args.stdout.write.called).toBeTruthy()
  expect(args.exit.called).toBeTruthy()
  expect(args.stdout.write.firstCall.args).toMatchSnapshot()
  expect(args.exit.firstCall.args).toEqual([0])
})

test('dep-merge-cli: version', async () => {
  const args = getArgs(['node', './index', '--version'])
  await depMerge(args)
  expect(args.stdout.write.called).toEqual(true)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
})

test('dep-merge-cli: unmerge without path', async () => {
  const args = getArgs(['node', './index', '--unmerge'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: merge without path', async () => {
  const args = getArgs(['node', './index', '--merge'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: total', async () => {
  const args = getArgs(['node', './index', '--merge', '--path', '/my-module'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
  const dir = await fs.readdir('/my-module')
  expect(dir).toEqual([ 'original_package.json', 'package.json' ])
  const pkg = await fs.readJson(`/my-module/package.json`)
  expect(pkg).toEqual(examplePackageExpected)

  const unMergeArgs = getArgs(['node', './index', '--unmerge', '--path', '/my-module'])
  await depMerge(unMergeArgs)
  expect(unMergeArgs.exit.called).toEqual(true)
  expect(unMergeArgs.exit.args[0][0]).toEqual(0)
  const _dir = await fs.readdir('/my-module')
  expect(_dir).toEqual([ 'package.json' ])
  const _pkg = await fs.readJson(`/my-module/package.json`)
  expect(_pkg).toEqual(examplePackage)
})

test('dep-merge-cli: total silent', async () => {
  const args = getArgs(['node', './index', '--merge', '--path', '/my-module', '--silent'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
  const dir = await fs.readdir('/my-module')
  expect(dir).toEqual([ 'original_package.json', 'package.json' ])
  const pkg = await fs.readJson(`/my-module/package.json`)
  expect(pkg).toEqual(examplePackageExpected)

  const unMergeArgs = getArgs(['node', './index', '--unmerge', '--path', '/my-module', '--silent'])
  await depMerge(unMergeArgs)
  expect(unMergeArgs.exit.called).toEqual(true)
  expect(unMergeArgs.exit.args[0][0]).toEqual(0)
  const _dir = await fs.readdir('/my-module')
  expect(_dir).toEqual([ 'package.json' ])
  const _pkg = await fs.readJson(`/my-module/package.json`)
  expect(_pkg).toEqual(examplePackage)
})

test('dep-merge-cli: invalid', async () => {
  const args = getArgs(['node', './index'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: invalid', async () => {
  const args = getArgs(['node', './index'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: invalid silent', async () => {
  const args = getArgs(['node', './index', '--silent'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: merge error', async () => {
  depMerge.__Rewire__('depMerge', async () => { throw new Error('test error') })
  const args = getArgs(['node', './index', '--merge', '--path', '/my-module', '--silent'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})

test('dep-merge-cli: unmerge error', async () => {
  depMerge.__Rewire__('unDepMerge', async () => { throw new Error('test error') })
  const args = getArgs(['node', './index', '--unmerge', '--path', '/my-module', '--silent'])
  await depMerge(args)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(1)
})
