import mockFs from 'mock-fs'
import {
  lernaRootBabel,
  lernaRootBabelCompare,
  lernaDepAudit
} from './index'

const dependencies = {'lodash': '4.0.0'}
const devDependencies = {'sinon': '4.0.0'}
const babelA = {'plugins': [ 'transform-object-rest-spread' ]}
const babelB = {'plugins': [ 'transform-runtime' ]}
const babelC = {'plugins': [ 'pumpkin-soup' ]}

const babelValidRoot = {'plugins': [
  ...babelA.plugins,
  ...babelB.plugins,
  ...babelC.plugins
]}

const babelInvalidRoot = {'plugins': [
  ...babelA.plugins,
  ...babelB.plugins
]}

beforeEach(async () => {
  mockFs({
    '/working-case': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies})
    },
    '/non-working-case': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies: {'fs-extra': '4.0.0'}})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies})
    },
    '/non-working-case-multiple-versions-same-dev-dep': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies: {'sinon': '4.0.1'}})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies: {'sinon': '4.0.2'}})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies: {'sinon': '4.0.3'}})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies: {'sinon': '4.0.3'}})
    },
    '/non-working-case-multiple-versions-same-dep': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies: {'sinon': '4.0.1'}})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies: {'sinon': '4.0.2'}})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies: {'sinon': '4.0.3'}})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies: {'sinon': '4.0.3'}})
    },
    '/non-working-case-invalid-root-version': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies: {'sinon': '4.0.1'}})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies: {'sinon': '4.0.1'}})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies: {'sinon': '4.0.1'}})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies: {'sinon': '4.0.3'}})
    },
    '/non-working-case-missing-root': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies: {'sinon': '4.0.1'}})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies: {'sinon': '4.0.1'}})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies: {'sinon': '4.0.1'}})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies: {}})
    },
    '/working-case-babel': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies, babel: babelA})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies, babel: babelB})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies, babel: babelC})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies, babel: babelValidRoot})
    },
    '/non-working-case-babel-missing-root': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies, babel: babelA})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies, babel: babelB})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies, babel: babelC})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies})
    },
    '/non-working-case-babel': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies, babel: babelA})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies, babel: babelB})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies, babel: babelC})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies, babel: babelInvalidRoot})
    },
    '/working-case-with-package-missing-packagejson': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies, devDependencies})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', dependencies, devDependencies})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies})},
        'd': {}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies})
    },
    '/working-case-with-packages-missing-dev-or-deps': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a', dependencies})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b', devDependencies})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c', dependencies, devDependencies})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']}),
      'package.json': JSON.stringify({'name': 'root', dependencies, devDependencies})
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('lernaDepAudit: working-case', async () => {
  const workingDir = '/working-case'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(0)
})

test('lernaDepAudit: working-case-with-package-missing-packagejson', async () => {
  const workingDir = '/working-case-with-package-missing-packagejson'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(0)
})

test('lernaDepAudit: working-case-with-packages-missing-dev-or-deps', async () => {
  const workingDir = '/working-case-with-packages-missing-dev-or-deps'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(0)
})

test('lernaDepAudit: non-working-case', async () => {
  const workingDir = '/non-working-case'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(1)
})

test('lernaDepAudit: non-working-case-multiple-versions-same-dev-dep', async () => {
  const workingDir = '/non-working-case-multiple-versions-same-dev-dep'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(1)
})

test('lernaDepAudit: non-working-case-multiple-versions-same-dep', async () => {
  const workingDir = '/non-working-case-multiple-versions-same-dep'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(1)
})

test('lernaDepAudit: non-working-case-missing-root', async () => {
  const workingDir = '/non-working-case-missing-root'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(1)
})

test('lernaDepAudit: non-working-case-invalid-root-version', async () => {
  const workingDir = '/non-working-case-invalid-root-version'
  const audit = await lernaDepAudit({workingDir})
  expect(audit.length).toEqual(1)
})

test('lernaRootBabelCompare: working-case-babel', async () => {
  const workingDir = '/working-case-babel'
  const {babelConfig} = await lernaRootBabel({workingDir})
  const babelRootRecomendation = {'plugins': ['transform-object-rest-spread', 'transform-runtime', 'pumpkin-soup']}
  expect(babelConfig).toEqual(babelRootRecomendation)
})

test('lernaRootBabelCompare: working-case-babel', async () => {
  const workingDir = '/working-case-babel'
  const compared = await lernaRootBabelCompare({workingDir})
  expect(compared).toEqual(true)
})

test('lernaRootBabelCompare: non-working-case-babel', async () => {
  const workingDir = '/non-working-case-babel'
  const babelCompare = await lernaRootBabelCompare({workingDir})
  expect(babelCompare).toEqual(false)
})

test('lernaRootBabelCompare: non-working-case-babel-missing-root', async () => {
  try {
    const workingDir = '/non-working-case-babel-missing-root'
    await lernaRootBabelCompare({workingDir})
  } catch (e) {
    expect(e).toBeTruthy()
  }
  expect.assertions(1)
})
