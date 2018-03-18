import pluginStandard, {ifLengthAddProp} from './index'

test('ifLengthAddProp', () => {
  expect(ifLengthAddProp('prop', [])).toEqual({})
  expect(ifLengthAddProp('prop', {})).toEqual({})
  expect(ifLengthAddProp('prop', ['hello'])).toEqual({'prop': ['hello']})
  expect(ifLengthAddProp('prop', {'hello': 'world'})).toEqual({'prop': {'hello': 'world'}})
})

test('pluginStandard: default', () => {
  const v = pluginStandard()
  const expectation = {
    scripts: {
      standard: 'standard'
    },
    devDependencies: {
      standard: '^11.0.0'
    }
  }
  expect(v).toEqual(expectation)
})

test('pluginStandard: addEsLint', () => {
  const v = pluginStandard({opt: {addEsLint: true}})
  const expectation = {
    scripts: {
      standard: 'standard'
    },
    devDependencies: {
      'babel-eslint': '^8.2.2',
      standard: '^11.0.0'
    },
    standard: {
      parser: 'babel-eslint'
    }
  }
  expect(v).toEqual(expectation)
})

test('pluginStandard: addJestGlobals', () => {
  const v = pluginStandard({opt: {addJestGlobals: true}})
  const expectation = {scripts: {standard: 'standard'}, devDependencies: {standard: '^11.0.0'}, standard: {globals: ['expect', 'test', 'beforeEach', 'afterEach']}}
  expect(v).toEqual(expectation)
})

test('pluginStandard: addJestGlobal', () => {
  const v = pluginStandard({opt: {addJestGlobal: true}})
  const expectation = {scripts: {standard: 'standard'}, devDependencies: {standard: '^11.0.0'}, standard: {globals: ['expect', 'test', 'beforeEach', 'afterEach']}}
  expect(v).toEqual(expectation)
})

test('pluginStandard: addJest', () => {
  const v = pluginStandard({opt: {addJest: true}})
  const expectation = {scripts: {standard: 'standard'}, devDependencies: {standard: '^11.0.0'}, standard: {globals: ['expect', 'test', 'beforeEach', 'afterEach']}}
  expect(v).toEqual(expectation)
})

test('pluginStandard: default with pkg', () => {
  const pkg = {
    existing: true,
    scripts: {
      existing: true
    },
    devDependencies: {
      existing: true
    }
  }
  const v = pluginStandard({pkg})
  const expectation = {
    existing: true,
    scripts: {
      existing: true,
      standard: 'standard'
    },
    devDependencies: {
      existing: true,
      standard: '^11.0.0'
    }
  }
  expect(v).toEqual(expectation)
})
