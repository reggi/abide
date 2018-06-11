import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import stringArgv from '@reggi/help.string-argv'
import {spy} from 'sinon'
import pkgpropCli from './index'

jest.mock('inquirer', () => ({
  prompt: () => require('bluebird').resolve({description: 'Hello World'})
}), {virtual: true})

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  cwd: () => __dirname,
  stdout: {write: spy()},
  exit: spy()
})

afterAll(async () => {
  await fs.remove('./examples')
})

test('pkgpropCli: empty', async () => {
  const args = getArgs([])
  try {
    await pkgpropCli(args)
  } catch (e) {
    expect(e.message).toBeTruthy()
  }
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
  expect.assertions(4)
})

test('pkgpropCli: help', async () => {
  const args = getArgs(['--help'])
  await pkgpropCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('pkgpropCli: version', async () => {
  const args = getArgs(['--version'])
  await pkgpropCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('pkgpropCli', async () => {
  await execa.shell(`
    mkdir -p ./examples/ &&
    mkdir -p ./examples/working &&
    echo "{}" > ./examples/working/package.json
  `, {cwd: __dirname})
  const argv = await stringArgv('--prop description --dir ./examples/working')
  await pkgpropCli(getArgs(argv))
  const pkg = await fs.readJson(path.join(__dirname, './examples/working/package.json'))
  expect(pkg.description).toEqual('Hello World')
})

test('pkgpropCli: absolute', async () => {
  await execa.shell(`
    mkdir -p ./examples/
    mkdir -p ./examples/working
    echo "{}" > ./examples/working/package.json
  `, {cwd: __dirname})
  const argv = await stringArgv(`--prop description --dir ${path.join(__dirname, './examples/working')}`)
  await pkgpropCli(getArgs(argv))
  const pkg = await fs.readJson(path.join(__dirname, './examples/working/package.json'))
  expect(pkg.description).toEqual('Hello World')
})

test('pkgpropCli: to-package', async () => {
  await execa.shell(`
    mkdir -p ./examples/
    mkdir -p ./examples/to-package
    echo "{}" > ./examples/to-package/package.json
  `, {cwd: __dirname})
  const argv = await stringArgv('--prop description --pkgpath ./examples/to-package/package.json')
  await pkgpropCli(getArgs(argv))
  const pkg = await fs.readJson(path.join(__dirname, './examples/to-package/package.json'))
  expect(pkg.description).toEqual('Hello World')
})
