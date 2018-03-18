import {get} from 'lodash'
import coerceToArray from '@reggi/journey.coerce-to-array'
import propOverwrite from '@reggi/pkg.prop-overwrite'

export const hunderedPercent = () => ({
  'collectCoverage': true,
  'coverageThreshold': {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  }
})

export default ({pkgrc, overwrite, pkg, opt}) => {
  return {
    ...pkg,
    scripts: propOverwrite(overwrite, get(pkg, 'scripts', {}), {
      'test': 'jest --coverage',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }),
    devDependencies: propOverwrite(overwrite, get(pkg, 'devDependencies', {}), {
      ...(opt.addBabelJest) ? {'babel-jest': '^22.4.1'} : {},
      'jest': '^22.4.2'
    }),
    jest: propOverwrite(overwrite, get(pkg, 'jest', {}), {
      ...(opt.hunderedPercent) ? hunderedPercent(opt.forceCoverageMatch) : {},
      ...(opt.forceCoverageMatch) ? {'forceCoverageMatch': [...get(pkg, 'jest.forceCoverageMatch', {}), ...coerceToArray(opt.forceCoverageMatch)]} : {}
    })
  }
}
