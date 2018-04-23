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
  const {success} = await requireable({modPath: './examples/working/package.json'})
  expect(success).toEqual(false)
})

test('requireable: should not work if module doesn\'t exist', async () => {
  const {success} = await requireable({modPath: './examples/non-existant'})
  expect(success).toEqual(false)
})

test('requireable: broken', async () => {
  const {success} = await requireable({modPath: './examples/broken'})
  expect(success).toEqual(false)
})

test('requireable: dir without package', async () => {
  const {success} = await requireable({modPath: './examples'})
  expect(success).toEqual(false)
})
