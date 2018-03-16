export const hunderedPercent = {
  'coverageThreshold': {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  }
}

export default ({pkgrc, pkg, opt}) => {
  return {
    ...pkg,
    scripts: {
      'test': 'jest --coverage',
      ...pkg.scripts
    },
    devDependencies: {
      ...(opt.addBabelJest) ? {'babel-jest': '^22.4.1'} : {},
      'jest': '^22.4.2',
      ...pkg.devDependencies
    },
    jest: {
      ...pkg.jest || {},
      ...(opt.hunderedPercent) ? hunderedPercent : {}
    }
  }
}
