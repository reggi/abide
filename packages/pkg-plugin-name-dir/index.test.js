import pluginNameDir from './index'

test('pluginNameDir: default', () => {
  const result = pluginNameDir({wd: './hello-world'})
  expect(result).toEqual({name: 'hello-world'})
})

test('pluginNameDir: kebab', () => {
  const result = pluginNameDir({wd: './helloWorld', opt: {kebab: true}})
  expect(result).toEqual({name: 'hello-world'})
})
