import fs from './index'

test('check props', () => {
  expect(fs).toHaveProperty('readFileAsync')
  expect(fs).toHaveProperty('readdirAsync')
  expect(fs).toHaveProperty('writeFileAsync')
})
