import mockFs from 'mock-fs'
import sinon from 'sinon'
import monorepoBabelCli from './index'

const getArgs = (argv, workingDir) => ({
  argv,
  stderr: {write: sinon.spy()},
  stdout: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => workingDir
})
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

test('meowcakes 3', () => {
  expect(true).toBe(true)
})

// test('monorepo-babel-cli: help', async () => {
//   const args = getArgs(['node', './index', '--help'])
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.called).toBeTruthy()
//   expect(args.exit.called).toBeTruthy()
//   expect(args.stdout.write.firstCall.args).toMatchSnapshot()
//   expect(args.exit.firstCall.args).toEqual([0])
// })

// test('monorepo-babel-cli: version', async () => {
//   const args = getArgs(['node', './index', '--version'])
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(0)
// })

// test('monorepo-babel-cli: --compare --silent', async () => {
//   const args = getArgs(['node', './index', '--compare', '--silent'], '/working-case-babel')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toEqual([])
//   expect(args.stdout.write.called).toEqual(false)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(0)
// })

// test('monorepo-babel-cli: --compare', async () => {
//   const args = getArgs(['node', './index', '--compare'], '/working-case-babel')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toEqual([['valid babel config\n']])
//   expect(args.stdout.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(0)
// })

// test('monorepo-babel-cli: --output', async () => {
//   const args = getArgs(['node', './index', '--output'], '/working-case-babel')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toMatchSnapshot()
//   expect(args.stdout.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(0)
// })

// test('monorepo-babel-cli: invalid args', async () => {
//   const args = getArgs(['node', './index'], '/working-case-babel')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toEqual([])
//   expect(args.stdout.write.called).toEqual(false)
//   expect(args.stderr.write.args).toEqual([['invalid arguments\n']])
//   expect(args.stderr.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(1)
// })

// test('monorepo-babel-cli: no config error case', async () => {
//   const args = getArgs(['node', './index', '--compare'], '/non-working-case-multiple-versions-same-dep')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toEqual([])
//   expect(args.stdout.write.called).toEqual(false)
//   expect(args.stderr.write.args).toEqual([['no babel config at package root\n']])
//   expect(args.stderr.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(1)
// })

// test('monorepo-babel-cli: error case', async () => {
//   const args = getArgs(['node', './index', '--compare'], '/non-working-case-babel')
//   await monorepoBabelCli(args)
//   expect(args.stdout.write.args).toEqual([])
//   expect(args.stdout.write.called).toEqual(false)
//   expect(args.stderr.write.args).toEqual([['invalid root babel config\n']])
//   expect(args.stderr.write.called).toEqual(true)
//   expect(args.exit.called).toEqual(true)
//   expect(args.exit.args[0][0]).toEqual(1)
// })
