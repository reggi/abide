import pluginJest from './index'

test('pluginJest', () => {
  const result = pluginJest({pkgrc: [], pkg: {}, opt: {}})
  expect(result).toMatchSnapshot()
})

test('pluginJest: babel, hunderedPercent', () => {
  const result = pluginJest({pkgrc: [], pkg: {}, opt: {babel: true, hunderedPercent: true}})
  expect(result).toMatchSnapshot()
})

test('pluginJest: babel, hunderedPercent, forceCoverageMatch', () => {
  const result = pluginJest({
    pkgrc: [],
    pkg: {},
    opt: {
      babel: true,
      hunderedPercent: true,
      forceCoverageMatch: 'index.js'
    }
  })
  expect(result).toMatchSnapshot()
})

test('pluginJest: with overwrite', () => {
  const pkg = {
    'scripts': {
      'test': 'original example'
    }
  }
  const result = pluginJest({
    overwrite: true,
    pkgrc: [],
    pkg: pkg,
    opt: {
      babel: true,
      hunderedPercent: true,
      forceCoverageMatch: 'index.js'
    }
  })
  expect(result).toMatchSnapshot()
})

test('pluginJest: without overwrite', () => {
  const pkg = {
    'scripts': {
      'test': 'original example'
    }
  }
  const result = pluginJest({
    overwrite: false,
    pkgrc: [],
    pkg: pkg,
    opt: {
      babel: true,
      hunderedPercent: true,
      forceCoverageMatch: 'index.js'
    }
  })
  expect(result).toMatchSnapshot()
})
