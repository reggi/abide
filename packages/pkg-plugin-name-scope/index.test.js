import pluginNameScope from './index'

test('pkg-plugin-name-scope: with no name', () => {
  expect(() => {
    pluginNameScope({
      overwrite: false,
      pkgrc: [],
      pkg: {}
    })
  }).toThrow()
})

test('pkg-plugin-name-scope: with name', () => {
  const result = pluginNameScope({
    overwrite: false,
    pkgrc: [],
    pkg: {name: 'some-pkg'},
    opt: '@reggi'
  })
  expect(result).toEqual({'name': '@reggi/some-pkg'})
})

test('pkg-plugin-name-scope: with existing scope', () => {
  const result = pluginNameScope({
    overwrite: false,
    pkgrc: [],
    pkg: {name: '@thomas/some-pkg'},
    opt: '@reggi'
  })
  expect(result).toEqual({'name': '@reggi/some-pkg'})
})
