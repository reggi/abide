import {fromPairs} from 'lodash'
import bluebird from 'bluebird'
import fs from 'fs-extra'
import path from 'path'
import depPointer from './index'

const packagesPath = path.join(__dirname, 'examples/packages')
let originalPackages

beforeAll(async () => {
  const packagesInDir = await fs.readdir(packagesPath)
  const packagesContent = await bluebird.map(packagesInDir, async pkg => {
    const packagePath = path.join(packagesPath, pkg, 'package.json')
    const packageContent = await fs.readJson(packagePath)
    return [pkg, packageContent]
  })
  originalPackages = fromPairs(packagesContent)
})

afterEach(async () => {
  await bluebird.map(Object.keys(originalPackages), async pkg => {
    const modulePath = path.join(packagesPath, pkg)
    const packageContent = originalPackages[pkg]
    await fs.writeJson(path.join(modulePath, 'package.json'), packageContent, {spaces: 2})
    await fs.remove(path.join(modulePath, 'package-local.json'))
  })
})

test('depPointer: with no arguments but in directory with package', async () => {
  const workingDir = path.join(__dirname, 'examples/packages/module-three')
  await depPointer({workingDir})
  const pkg = await fs.readJson(path.join(workingDir, 'package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  const pkgFour = await fs.readJson(path.join(workingDir, '../module-four/package.json'))
  expect(pkgFour.dependencies['module-one']).toEqual('file:../module-one')
  const pkgLocal = await fs.readJson(path.join(workingDir, 'package-local.json'))
  expect(pkgLocal.dependencies['module-one']).toEqual('file:../module-one')
})

test('depPointer: with no arguments but in directory with package (no backup)', async () => {
  const workingDir = path.join(__dirname, 'examples/packages/module-three')
  await depPointer({workingDir, backupLocal: false})
  const pkg = await fs.readJson(path.join(workingDir, 'package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  const pkgFour = await fs.readJson(path.join(workingDir, '../module-four/package.json'))
  expect(pkgFour.dependencies['module-one']).toEqual('file:../module-one')
})

test('depPointer: in parent dir with passed in updatePackage', async () => {
  const workingDir = path.join(__dirname, 'examples')
  await depPointer({workingDir, packageName: 'module-three'})
  const pkg = await fs.readJson(path.join(workingDir, 'packages/module-three/package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  const pkgFour = await fs.readJson(path.join(workingDir, 'packages/module-four/package.json'))
  expect(pkgFour.dependencies['module-one']).toEqual('file:../module-one')
  const pkgLocal = await fs.readJson(path.join(workingDir, 'packages/module-three/', 'package-local.json'))
  expect(pkgLocal.dependencies['module-one']).toEqual('file:../module-one')
})

test('depPointer: updateAll', async () => {
  const workingDir = path.join(__dirname, 'examples')
  await depPointer({workingDir, all: true})
  const pkg = await fs.readJson(path.join(workingDir, 'packages/module-three/package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  const pkgFour = await fs.readJson(path.join(workingDir, 'packages/module-four/package.json'))
  expect(pkgFour.dependencies['module-one']).toEqual('1.0.0')
})

test('depPointer: updateChanged', async () => {
  const workingDir = path.join(__dirname, 'examples')
  await depPointer({workingDir, changed: true})
  const c = await fs.readJson(path.join(workingDir, 'packages/module-three/package.json'))
  expect(c.dependencies['module-one']).toEqual('1.0.0')
  const d = await fs.readJson(path.join(workingDir, 'packages/module-four/package.json'))
  expect(d.dependencies['module-one']).toEqual('1.0.0')
})

test('depPointer: no package specified ', async () => {
  const workingDir = path.join(__dirname, 'examples/package')
  try {
    await depPointer({workingDir})
  } catch (e) {
    expect(e).toBeTruthy()
  }
  expect.assertions(1)
})

test('depPointer: uses then rollback', async () => {
  const workingDir = path.join(__dirname, 'examples/packages/module-three')
  await depPointer({workingDir})
  const pkg = await fs.readJson(path.join(workingDir, 'package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  await depPointer({workingDir, useLocal: true})
  const pkgRolledback = await fs.readJson(path.join(workingDir, 'package.json'))
  expect(pkgRolledback.dependencies['module-one']).toEqual('file:../module-one')
})

test('depPointer: no lock file', async () => {
  const workingDir = path.join(__dirname, 'examples/packages/module-three')
  try {
    await depPointer({workingDir, useLocal: true})
  } catch (e) {
    expect(e).toBeTruthy()
  }
  expect.assertions(1)
})
