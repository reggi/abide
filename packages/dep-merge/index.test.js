import {depMerge, unDepMerge} from './index'
import mockFs from 'mock-fs'
import fsExtra from 'fs-extra'
import fsMz from 'mz/fs'
const fs = {...fsExtra, ...fsMz}

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

beforeEach(() => {
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
})

test('dep-merge pass empty dir', async () => {
  const results = await depMerge('/no-module')
  expect(results).toEqual({
    dirPath: '/no-module',
    endsInPackageJson: null,
    pkgPath: '/no-module/package.json',
    fileExists: false
  })
})

test('dep-merge pass dir with dir package.json', async () => {
  const results = await depMerge('/invalid-package')
  expect(results).toEqual({
    dirPath: '/invalid-package',
    endsInPackageJson: null,
    pkgPath: '/invalid-package/package.json',
    fileExists: false
  })
})

test('dep-merge', async () => {
  const results = await depMerge('/my-module')
  const dir = await fs.readdir('/my-module')
  expect(results).toEqual({
    'dirPath': '/my-module',
    'endsInPackageJson': null,
    'pkgPath': '/my-module/package.json',
    'fileExists': true,
    'packageContent': {
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
    },
    'newPackageJson': {
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
    },
    'mvPath': '/my-module/original_package.json'
  })
  expect(dir).toEqual([ 'original_package.json', 'package.json' ])
})

test('dep-merge passing in dir', async () => {
  const results = await depMerge('/my-module')
  const dir = await fs.readdir('/my-module')
  expect(results).toMatchSnapshot()
  expect(dir).toEqual([ 'original_package.json', 'package.json' ])
  const umergeResult = await unDepMerge('/my-module')
  const dirAfterUnMerge = await fs.readdir('/my-module')
  const pkg = await fs.readJson('/my-module/package.json')
  expect(umergeResult).toMatchSnapshot()
  expect(dirAfterUnMerge).toEqual([ 'package.json' ])
  expect(pkg).toEqual(examplePackage)
})

test('dep-merge passing in pkg', async () => {
  const results = await depMerge('/my-module/package.json')
  const dir = await fs.readdir('/my-module')
  expect(results).toMatchSnapshot()
  expect(dir).toEqual([ 'original_package.json', 'package.json' ])
  const umergeResult = await unDepMerge('/my-module/package.json')
  const dirAfterUnMerge = await fs.readdir('/my-module')
  const pkg = await fs.readJson('/my-module/package.json')
  expect(umergeResult).toMatchSnapshot()
  expect(dirAfterUnMerge).toEqual([ 'package.json' ])
  expect(pkg).toEqual(examplePackage)
})
