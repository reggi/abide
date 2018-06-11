import mockFs from 'mock-fs'
import lernaPaths, {lernaCorePaths} from './index'

beforeEach(async () => {
  mockFs({
    '/working-case': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a'})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b'})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c'})}
      },
      'lerna.json': JSON.stringify({'packages': ['./packages/*']})
    },
    '/missing-packages-prop': {
      'packages': {
        'a': {'package.json': JSON.stringify({name: '@reggi/example-a'})},
        'b': {'package.json': JSON.stringify({name: '@reggi/example-b'})},
        'c': {'package.json': JSON.stringify({name: '@reggi/example-c'})}
      },
      'lerna.json': JSON.stringify({})
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('lernaCorePaths: working case', async () => {
  const result = await lernaCorePaths({workingDir: '/working-case'})
  expect(result).toMatchSnapshot()
})

test('lernaPaths: working case', async () => {
  const result = await lernaPaths({workingDir: '/working-case'})
  expect(result).toMatchSnapshot()
})

test('lernaPaths: missing packages prop', async () => {
  try {
    await lernaPaths({workingDir: '/missing-packages-prop'})
  } catch (e) {
    expect(e).toBeTruthy()
  }
  expect.assertions(1)
})
