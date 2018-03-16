import {get} from 'lodash'

export default ({pkg, opt}) => ({
  ...pkg,
  devDependencies: {
    'standard': '^11.0.0',
    ...get(pkg, 'devDependencies', {})
  },
  standard: {
    ...get(pkg, 'standard', {}),
    globals: [
      ...get(pkg, 'standard.global', {}),
      ...(opt.addJestGlobal) ? ['expect', 'test'] : []
    ]
  }
})
