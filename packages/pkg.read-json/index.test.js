import mock from 'mock-fs'
import readJson from './index'

const validJson = {'hello': 'world'}
const invalidJson = '{hello: world}'

beforeEach(async () => {
  mock({
    'dir': {
      'valid.json': JSON.stringify(validJson),
      'invalid.json': invalidJson
    }
  })
})

afterEach(async () => {
  mock.restore()
})

test('readJson: valid, true existsRequired, true validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = true
  const validJsonRequired = true
  const result = await readJson({workingDir, fileName: 'valid.json', existsRequired, validJsonRequired})
  expect(result).toEqual(validJson)
})

test('readJson: valid, false existsRequired, false validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = false
  const validJsonRequired = false
  const result = await readJson({workingDir, fileName: 'valid.json', existsRequired, validJsonRequired})
  expect(result).toEqual(validJson)
})

test('readJson: invalid, true existsRequired, true validJsonRequired', () => {
  const workingDir = 'dir'
  const existsRequired = true
  const validJsonRequired = true
  const result = readJson({workingDir, fileName: 'invalid.json', existsRequired, validJsonRequired})
  return expect(result).rejects.toThrow()
})

test('readJson: invalid, false existsRequired, false validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = false
  const validJsonRequired = false
  const result = await readJson({workingDir, fileName: 'invalid.json', existsRequired, validJsonRequired})
  expect(result).toEqual(false)
})

test('readJson: missing, true existsRequired, true validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = true
  const validJsonRequired = true
  const result = readJson({workingDir, fileName: 'missing.json', existsRequired, validJsonRequired})
  return expect(result).rejects.toThrow()
})

test('readJson: missing, false existsRequired, false validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = false
  const validJsonRequired = false
  const result = await readJson({workingDir, fileName: 'missing.json', existsRequired, validJsonRequired})
  expect(result).toEqual(false)
})

test('readJson: missing, true existsRequired, false validJsonRequired', async () => {
  const workingDir = 'dir'
  const existsRequired = true
  const validJsonRequired = false
  const result = readJson({workingDir, fileName: 'missing.json', existsRequired, validJsonRequired})
  expect(result).rejects.toThrow()
})

test('readJson: missing', async () => {
  const workingDir = 'dir'
  const result = await readJson({workingDir, fileName: 'missing.json'})
  expect(result).toEqual(false)
})
