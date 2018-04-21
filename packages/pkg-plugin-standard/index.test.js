import pluginStandard, {ifLengthAddProp} from './index'

test('ifLengthAddProp', () => {
  expect(ifLengthAddProp('prop', [])).toEqual({})
  expect(ifLengthAddProp('prop', {})).toEqual({})
  expect(ifLengthAddProp('prop', ['hello'])).toEqual({'prop': ['hello']})
  expect(ifLengthAddProp('prop', {'hello': 'world'})).toEqual({'prop': {'hello': 'world'}})
})

test('pluginStandard: default', () => {
  const results = pluginStandard()
  expect(results).toMatchSnapshot()
})

test('pluginStandard: babel', () => {
  const args = {opt: {babel: true}}
  const results = pluginStandard(args)
  expect(results).toMatchSnapshot()
})

test('pluginStandard: jest', () => {
  const args = {opt: {jest: true}}
  const results = pluginStandard(args)
  expect(results).toMatchSnapshot()
})

test('pluginStandard: default with pkg', () => {
  const args = {
    pkg: {
      existing: true,
      scripts: {
        existing: true
      },
      devDependencies: {
        existing: true
      }
    }
  }
  const results = pluginStandard(args)
  expect(results).toMatchSnapshot()
})
