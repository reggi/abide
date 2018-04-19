import mz from 'mz/fs'
import extra from 'fs-extra'
import mockFs from 'mock-fs'
import {pkgCore} from './index'
const fs = {...extra, ...mz}

beforeAll(() => {
  jest.mock('/example-name-scope-plugin/example-plugin.js', () => ({
    default: ({pkg = {}, wd, opt} = {}) => {
      if (!pkg.name) throw new Error('missing name')
      const ogName = pkg.name
      const splitName = ogName.split('/')
      const name = (splitName.length >= 2) ? splitName[1] : ogName
      return {
        ...pkg,
        name: `${opt}/${name}`
      }
    }
  }), {virtual: true})
})

beforeAll(() => {
  jest.mock('/example-name-scope-plugin/example-array.js', () => ({
    default: [[
      ({pkg = {}, wd, opt} = {}) => {
        if (!pkg.name) throw new Error('missing name')
        const ogName = pkg.name
        const splitName = ogName.split('/')
        const name = (splitName.length >= 2) ? splitName[1] : ogName
        return {
          ...pkg,
          name: `${opt}/${name}`
        }
      },
      '@reggi'
    ]]
  }), {virtual: true})
})

beforeAll(() => {
  jest.mock('/example-name-scope-plugin/no-default.js', () => ([[
    ({pkg = {}, wd, opt} = {}) => {
      if (!pkg.name) throw new Error('missing name')
      const ogName = pkg.name
      const splitName = ogName.split('/')
      const name = (splitName.length >= 2) ? splitName[1] : ogName
      return {
        ...pkg,
        name: `${opt}/${name}`
      }
    },
    '@reggi'
  ]]), {virtual: true})
})

beforeAll(() => {
  jest.mock('pkg-plugin-name-scope', () => ({
    default: ({pkg = {}, wd, opt} = {}) => {
      if (!pkg.name) throw new Error('missing name')
      const ogName = pkg.name
      const splitName = ogName.split('/')
      const name = (splitName.length >= 2) ? splitName[1] : ogName
      return {
        ...pkg,
        name: `${opt}/${name}`
      }
    }
  }), {virtual: true})
})

beforeAll(() => {
  jest.mock('pkg-plugin-name-rick', () => ({
    default: ({pkg = {}, wd} = {}) => {
      return {
        ...pkg,
        name: 'rick'
      }
    }
  }), {virtual: true})
})

beforeEach(async () => {
  mockFs({
    '/dir': {
      '.pkgrc': JSON.stringify([])
    },
    '/example-name-scope-plugin': {
      'missing-package-name-case': {
        '.pkgrc': JSON.stringify([
          '../example-plugin.js'
        ]),
        'package.json': JSON.stringify({})
      },
      'package-name-case': {
        '.pkgrc': JSON.stringify([
          ['../example-plugin.js', '@reggi']
        ]),
        'package.json': JSON.stringify({name: 'example'})
      },
      'array-plugins': {
        '.pkgrc': JSON.stringify([
          ['../example-array.js', '@reggi']
        ]),
        'package.json': JSON.stringify({name: 'example'})
      },
      'no-default': {
        '.pkgrc': JSON.stringify([
          ['../no-default.js', '@reggi']
        ]),
        'package.json': JSON.stringify({name: 'example'})
      },
      'global-module': {
        '.pkgrc': JSON.stringify([
          ['pkg-plugin-name-scope', '@reggi']
        ]),
        'package.json': JSON.stringify({name: 'example'})
      },
      'no-option-module': {
        '.pkgrc': JSON.stringify([
          ['pkg-plugin-name-rick']
        ]),
        'package.json': JSON.stringify({name: 'example'})
      },
      'direct-plugin': {
        'package.json': JSON.stringify({name: 'example'})
      }
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('pkgCore: no plugins, no write', async () => {
  await pkgCore({workingDir: '/dir', write: false})
  const dir = await fs.readdir('/dir')
  expect(dir).toEqual(['.pkgrc'])
})

test('pkgCore: no plugins, write', async () => {
  const {writeFilePath} = await pkgCore({workingDir: '/dir', write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir('/dir')
  expect(pkg).toEqual({})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, missing name', async () => {
  var errorToOccur = false
  try {
    await pkgCore({
      workingDir: '/example-name-scope-plugin/missing-package-file-case',
      write: true
    })
  } catch (e) {
    expect(e.message).toBeTruthy()
    errorToOccur = true
  }
  expect(errorToOccur).toBeTruthy()
})

test('pkgCore: no args', async () => {
  var error = false
  try {
    await pkgCore()
  } catch (e) {
    error = e
  }
  expect(error).toBeTruthy()
})

test('pkgCore: plugins, write, working name', async () => {
  const workingDir = '/example-name-scope-plugin/package-name-case'
  const {writeFilePath} = await pkgCore({workingDir, write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': '@reggi/example'})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, array plugins', async () => {
  const workingDir = '/example-name-scope-plugin/array-plugins'
  const {writeFilePath} = await pkgCore({workingDir, write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': '@reggi/example'})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, no-default', async () => {
  const workingDir = '/example-name-scope-plugin/no-default'
  const {writeFilePath} = await pkgCore({workingDir, write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': '@reggi/example'})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, global-module', async () => {
  const workingDir = '/example-name-scope-plugin/global-module'
  const {writeFilePath} = await pkgCore({workingDir, write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': '@reggi/example'})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, no-option-module', async () => {
  const workingDir = '/example-name-scope-plugin/no-option-module'
  const {writeFilePath} = await pkgCore({workingDir, write: true})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': 'rick'})
  expect(dir).toEqual(['.pkgrc', 'package.json'])
})

test('pkgCore: plugins, write, pass plugin', async () => {
  const workingDir = '/example-name-scope-plugin/direct-plugin'
  const {writeFilePath} = await pkgCore({workingDir, write: true, plugin: 'pkg-plugin-name-rick'})
  const pkg = await fs.readJson(writeFilePath)
  const dir = await fs.readdir(workingDir)
  expect(pkg).toEqual({'name': 'rick'})
  expect(dir).toEqual(['package.json'])
})
