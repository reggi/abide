import pluginRepo from './index'

test('pluginRepo', () => {
  const pkg = {
    name: 'love'
  }
  const opt = {
    prefix: 'http://github.com/reggi/',
    type: 'git'
  }
  const result = pluginRepo({pkg, opt})
  expect(result).toEqual({
    name: 'love',
    repository: {
      url: 'http://github.com/reggi/love',
      type: 'git'
    }
  })
})

test('pluginRepo - missing prefix', () => {
  const pkg = {
    name: 'love'
  }
  const opt = {
    type: 'git'
  }
  expect(() => {
    pluginRepo({pkg, opt})
  }).toThrow()
})

test('pluginRepo - missing type', () => {
  const pkg = {
    name: 'love'
  }
  const opt = {
    prefix: 'http://github.com/reggi/'
  }
  expect(() => {
    pluginRepo({pkg, opt})
  }).toThrow()
})
