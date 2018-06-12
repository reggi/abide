import mockFs from 'mock-fs'
import shebangCheck from './index'

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

test('shebangCheck: invalid-array-bin-package', async () => {
  try {
    await shebangCheck({workingDir: '/invalid-array-bin-package'})
  } catch (e) {
    expect(e).toBeTruthy()
  }
  expect.assertions(1)
})

test('shebangCheck: empty-package', async () => {
  const result = await shebangCheck({workingDir: '/empty-package'})
  expect(result).toEqual(null)
})

test('shebangCheck: invalid-shebang', async () => {
  const result = await shebangCheck({workingDir: '/invalid-shebang'})
  expect(result).toEqual(false)
})

test('shebangCheck: working-bin-prop-string', async () => {
  const result = await shebangCheck({workingDir: '/working-bin-prop-string'})
  expect(result).toEqual(true)
})

test('shebangCheck: working-bin-prop-object', async () => {
  const result = await shebangCheck({workingDir: '/working-bin-prop-object'})
  expect(result).toEqual(true)
})
