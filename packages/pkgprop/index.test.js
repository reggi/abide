import pkgprop from './index'
import fs from 'fs-extra'
import mockFs from 'mock-fs'

pkgprop.__Rewire__('inquirer', {
  prompt: async () => {
    return {
      description: 'Hello World'
    }
  }
})

beforeEach(async () => {
  mockFs({
    'package.json': JSON.stringify({}),
    '/example': {
      'package.json': JSON.stringify({})
    },
    '/exists': {
      'package.json': JSON.stringify({description: 'Meow'})
    }
  })
})

afterEach(async () => {
  mockFs.restore()
})

test('pkgprop', async () => {
  await pkgprop({
    props: ['description']
  })
  const pkg = await fs.readJson('package.json')
  expect(pkg.description).toEqual('Hello World')
})

test('pkgprop: without defaults', async () => {
  await pkgprop({
    workingDir: '/example',
    prop: 'description',
    packagePath: './package.json'
  })
  const pkg = await fs.readJson('/example/package.json')
  expect(pkg.description).toEqual('Hello World')
})

test('pkgprop: absolute package', async () => {
  await pkgprop({
    prop: 'description',
    packagePath: '/example/package.json'
  })
  const pkg = await fs.readJson('/example/package.json')
  expect(pkg.description).toEqual('Hello World')
})

test('pkgprop: absolute package', async () => {
  await pkgprop({
    prop: 'description',
    packagePath: '/example/package.json'
  })
  const pkg = await fs.readJson('/example/package.json')
  expect(pkg.description).toEqual('Hello World')
})

test('pkgprop: absolute package', async () => {
  await pkgprop({
    prop: 'description',
    packagePath: '/exists/package.json'
  })
  const pkg = await fs.readJson('/exists/package.json')
  expect(pkg.description).toEqual('Hello World')
})
