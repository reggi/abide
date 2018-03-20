import pluginJest from './index'

test('pluginJest', () => {
  const result = pluginJest({pkgrc: [], pkg: {}, opt: {}})
  const expectation = {
    'devDependencies': {
      'jest': '^22.4.2'
    },
    'jest': {},
    'scripts': {
      'test': 'jest --coverage',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }
  }
  expect(result).toEqual(expectation)
})

test('pluginJest: babel, hunderedPercent', () => {
  const result = pluginJest({pkgrc: [], pkg: {}, opt: {babel: true, hunderedPercent: true}})
  const expectation = {
    'devDependencies': {
      'jest': '^22.4.2',
      'babel-jest': '^22.4.1'
    },
    'jest': {
      'collectCoverage': true,
      'coverageThreshold': {
        'global': {
          'branches': 100,
          'functions': 100,
          'lines': 100,
          'statements': 100
        }
      }
    },
    'scripts': {
      'test': 'jest --coverage',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }
  }
  expect(result).toEqual(expectation)
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
  const expectation = {
    'devDependencies': {
      'jest': '^22.4.2',
      'babel-jest': '^22.4.1'
    },
    'jest': {
      'collectCoverage': true,
      'coverageThreshold': {
        'global': {
          'branches': 100,
          'functions': 100,
          'lines': 100,
          'statements': 100
        }
      },
      'forceCoverageMatch': [
        'index.js'
      ]
    },
    'scripts': {
      'test': 'jest --coverage',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }
  }
  expect(result).toEqual(expectation)
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

  const expectation = {
    'devDependencies': {
      'jest': '^22.4.2',
      'babel-jest': '^22.4.1'
    },
    'jest': {
      'collectCoverage': true,
      'coverageThreshold': {
        'global': {
          'branches': 100,
          'functions': 100,
          'lines': 100,
          'statements': 100
        }
      },
      'forceCoverageMatch': [
        'index.js'
      ]
    },
    'scripts': {
      'test': 'jest --coverage',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }
  }

  expect(result).toEqual(expectation)
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

  const expectation = {
    'devDependencies': {
      'jest': '^22.4.2',
      'babel-jest': '^22.4.1'
    },
    'jest': {
      'collectCoverage': true,
      'coverageThreshold': {
        'global': {
          'branches': 100,
          'functions': 100,
          'lines': 100,
          'statements': 100
        }
      },
      'forceCoverageMatch': [
        'index.js'
      ]
    },
    'scripts': {
      'test': 'original example',
      'test:result': 'npm run test --silent &>/dev/null || echo $?'
    }
  }

  expect(result).toEqual(expectation)
})
