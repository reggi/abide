import pluginBabel from './index.js'

test('pluginBabel', () => {
  expect(() => {
    pluginBabel()
  }).toThrow()
})

test('pluginBabel: with main', () => {
  const result = pluginBabel({pkg: {'main': './index.build.js'}})
  expect(result).toMatchSnapshot()
})

test('pluginBabel: with main', () => {
  const result = pluginBabel({pkg: {'main': './dist/index.js'}})
  expect(result).toMatchSnapshot()
})

test('pluginBabel: with bin', () => {
  const result = pluginBabel({pkg: {'bin': './lib/index.js'}})
  expect(result).toMatchSnapshot()
})
