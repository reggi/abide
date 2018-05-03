import mockFs from 'mock-fs'
import { traverseUp, pathType } from './index'

beforeEach(async () => {
  mockFs({
    '/example-alpha': {
      'a': {
        'package.json': JSON.stringify({}),
        'b': {
          'c': {}
        }
      }
    },
    '/example-beta': {
      'a': {
        'node_modules': {},
        'b': {
          'c': {}
        }
      }
    },
    '/example-gamma': {
      'a': {
        'regular-file': 'file contents',
        'a-symlink': mockFs.symlink({
          path: 'regular-file'
        }),
        'b': {
          'c': {}
        }
      }
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('gitpkg.traverse-up: file', async () => {
  const packagePath = await traverseUp({
    findPathPattern: 'package.json',
    findTypePattren: 'file',
    workingDir: './c',
    cwd: '/example-alpha/a/b'
  })
  expect(packagePath).toEqual('/example-alpha/a/package.json')
})

test('gitpkg.traverse-up: file / dir conflict', async () => {
  try {
    await traverseUp({
      findPathPattern: 'package.json',
      findTypePattren: 'directory',
      workingDir: './c',
      cwd: '/example-alpha/a/b'
    })
  } catch (e) {
    expect(e.message).toBeTruthy()
  }
  expect.assertions(1)
})

test('gitpkg.traverse-up: directory', async () => {
  const packagePath = await traverseUp({
    findPathPattern: 'node_modules',
    findTypePattren: 'directory',
    workingDir: './c',
    cwd: '/example-beta/a/b'
  })
  expect(packagePath).toEqual('/example-beta/a/node_modules')
})

test('gitpkg.traverse-up: else', async () => {
  const packagePath = await traverseUp({
    findPathPattern: 'a-symlink',
    findTypePattren: 'else',
    workingDir: './c',
    cwd: '/example-gamma/a/b'
  })
  expect(packagePath).toEqual('/example-gamma/a/a-symlink')
})

test('gitpkg.traverse-up: no match', async () => {
  try {
    await traverseUp({
      findPathPattern: 'node_modules',
      findTypePattren: 'directory',
      workingDir: './c',
      cwd: '/example-alpha/a/b'
    })
  } catch (e) {
    expect(e.message).toBeTruthy()
  }
  expect.assertions(1)
})

test('gitpkg.traverse-up: pathType non-existant', async () => {
  const result = await pathType('/meow')
  expect(result).toEqual(false)
})
