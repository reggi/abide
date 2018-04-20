import {get, size} from 'lodash'
import propOverwrite from '@reggi/pkg.prop-overwrite'
import coreceToArray from '@reggi/journey.coerce-to-array'

const jestGlobals = [
  'beforeAll',
  'afterAll',
  'expect',
  'test',
  'beforeEach',
  'afterEach',
  'it',
  'jest'
]

export const ifLengthAddProp = (prop, item) => (size(item)) ? {[prop]: item} : {}

export default ({pkg = {}, overwrite = false, opt = {}} = {}) => ({
  ...pkg,
  scripts: propOverwrite(overwrite, get(pkg, 'scripts', {}), {
    standard: 'standard'
  }),
  devDependencies: propOverwrite(overwrite, get(pkg, 'devDependencies', {}), {
    'standard': '^11.0.0',
    ...(opt.babel) ? {'babel-eslint': '^8.2.2'} : {}
  }),
  ...ifLengthAddProp('standard', propOverwrite(overwrite, get(pkg, 'standard', {}), {
    ...(opt.babel) ? {'parser': 'babel-eslint'} : {},
    ...ifLengthAddProp('ignore', [
      ...get(pkg, 'standard.ignore', []),
      ...coreceToArray(get(opt, 'ignore', []))
    ]),
    ...ifLengthAddProp('globals', [
      ...get(pkg, 'standard.global', []),
      ...(opt.jest) ? jestGlobals : []
    ])
  }))
})
