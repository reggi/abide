import mockFs from 'mock-fs'
import index, {lernaPaths, updatedPaths} from './index'

beforeEach(async () => {
  console.log('')
  mockFs({
    '/example-alpha': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a'})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b'})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c'})}
      },
      'lerna.json': JSON.stringify({})
    },
    '/example-beta': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a'})},
        'b': {},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c'})}
      },
      'lerna.json': JSON.stringify({})
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('lernaPaths: working case', async () => {
  const result = await lernaPaths({workingDir: '/example-alpha'})
  expect(result).toEqual({
    'bin': '/example-alpha/node_modules/.bin/lerna',
    'config': '/example-alpha/lerna.json',
    'root': '/example-alpha'
  })
})

test('updatedPaths', async () => {
  index.__Rewire__('execa', {shell: async () => {
    return {
      stdout: JSON.stringify([
        {
          'name': '@reggi/example-b',
          'version': '0.0.1',
          'private': false
        }
      ])
    }
  }})
  const result = await updatedPaths({workingDir: '/example-alpha'})
  expect(result).toEqual(['/example-alpha/packages/b'])
})

test('updatedPaths', async () => {
  index.__Rewire__('execa', {shell: async () => {
    return {
      stdout: JSON.stringify([
        {
          'name': '@reggi/example-b',
          'version': '0.0.1',
          'private': false
        }
      ])
    }
  }})
  const result = await updatedPaths({workingDir: '/example-beta'})
  expect(result).toEqual([])
})

test('updatedPaths', async () => {
  index.__Rewire__('execa', {shell: async () => {
    throw new Error('false error')
  }})
  const result = await updatedPaths({workingDir: '/example-alpha'})
  expect(result).toEqual([])
})
