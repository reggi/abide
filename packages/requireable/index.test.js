import path from 'path'
import requireable from './index'
import fs from 'fs-extra'

jest.setTimeout(10000)

const workingPath = path.join(__dirname, './examples/working')

afterEach(async () => {
  await fs.remove(path.join(__dirname, './examples/broken/node_modules'))
  await fs.remove(path.join(__dirname, './examples/working/node_modules'))
})

test('requireable: working', async () => {
  const {success} = await requireable({modPath: workingPath})
  expect(success).toEqual(true)
})

test('requireable: working inherit', async () => {
  const {success} = await requireable({modPath: workingPath, inherit: true})
  expect(success).toEqual(true)
})

test('requireable: should not work if file', async () => {
  try {
    await requireable({modPath: path.join(workingPath, 'package.json')})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: should not work if module doesn\'t exist', async () => {
  try {
    await requireable({modPath: path.join(__dirname, './examples/non-existant')})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: broken', async () => {
  try {
    await requireable({modPath: path.join(__dirname, './examples/broken')})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: dir without package', async () => {
  try {
    await requireable({modPath: path.join(__dirname, './examples')})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})
