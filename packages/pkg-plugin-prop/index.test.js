import pluginProp from './index'

test('pluginProp', () => {
  const pkg = {
    existing: true
  }
  const opt = {
    author: 'Thomas'
  }
  const result = pluginProp({pkg, opt})
  expect(result).toEqual({
    existing: true,
    author: 'Thomas'
  })
})

test('pluginProp: empty opt', () => {
  const pkg = {
    existing: true
  }
  const result = pluginProp({pkg, opt: false})
  expect(result).toEqual({
    existing: true
  })
})
