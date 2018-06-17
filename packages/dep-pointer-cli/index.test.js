import {fromPairs} from 'lodash'
import path from 'path'
import bluebird from 'bluebird'
import sinon from 'sinon'
import depPointerCli from './index'
import fs from 'fs-extra'

const getArgs = (argv, workingDir) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => workingDir
})

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

test('dep-pointer-cli: help', async () => {
  const args = getArgs(['--help'])
  await depPointerCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('dep-pointer-cli: version', async () => {
  const args = getArgs(['--version'])
  await depPointerCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('dep-pointer-cli', async () => {
  const workingDir = path.join(__dirname, './examples/packages/module-three')
  await depPointerCli(getArgs([], workingDir))
  const pkg = await fs.readJson(path.join(workingDir, 'package.json'))
  expect(pkg.dependencies['module-one']).toEqual('1.0.0')
  const pkgFour = await fs.readJson(path.join(workingDir, '../module-four/package.json'))
  expect(pkgFour.dependencies['module-one']).toEqual('file:../module-one')
  const pkgLocal = await fs.readJson(path.join(workingDir, 'package-local.json'))
  expect(pkgLocal.dependencies['module-one']).toEqual('file:../module-one')
})
