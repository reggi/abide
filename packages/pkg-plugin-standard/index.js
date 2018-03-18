import {get} from 'lodash'

const jestGlobals = [
  'expect',
  'test',
  'beforeEach',
  'afterEach'
]

export default ({pkg, opt}) => ({
  ...pkg,
  scripts: {
    ...pkg.scripts,
    standard: 'standard'
  },
  devDependencies: {
    'standard': '^11.0.0',
    'babel-eslint': '^8.2.2',
    ...get(pkg, 'devDependencies', {})
  },
  standard: {
    ...get(pkg, 'standard', {}),
    'parser': 'babel-eslint',
    'ignore': ['index.build.js'],
    globals: [
      ...get(pkg, 'standard.global', {}),
      ...(opt.addJestGlobal) ? jestGlobals : []
    ]
  }
})
