import requireable from './index'
import fs from 'fs-extra'

afterEach(async () => {
  await fs.remove('./examples/working/node_modules')
  await fs.remove('./examples/broken/node_modules')
})

test('requireable: working', async () => {
  const {success} = await requireable({modPath: './examples/working'})
  expect(success).toEqual(true)
})

test('requireable: working inherit', async () => {
  const {success} = await requireable({modPath: './examples/working', inherit: true})
  expect(success).toEqual(true)
})

test('requireable: should not work if file', async () => {
  try {
    await requireable({modPath: './examples/working/package.json'})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: should not work if module doesn\'t exist', async () => {
  try {
    await requireable({modPath: './examples/non-existant'})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: broken', async () => {
  try {
    await requireable({modPath: './examples/broken'})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})

test('requireable: dir without package', async () => {
  try {
    await requireable({modPath: './examples'})
  } catch (e) {
    expect(e).toBeDefined()
  }
  expect.assertions(1)
})
