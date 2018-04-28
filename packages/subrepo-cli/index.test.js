import path from 'path'
import stringArgv from '@reggi/help.string-argv'
import {spy} from 'sinon'
import fs from 'fs-extra'
import execa from 'execa'
import subrepoCli from './index'

beforeEach(async () => {
  await execa.shell(`
    mkdir -p ./example-repo
    cd ./example-repo
    git init
    git config user.email "thomas@reggi.com"
    git config user.name "reggi"
    echo "a" > index-a.txt
    echo "b" > index-b.txt
    git add -A
    git commit -m "init"
    mkdir -p subrepo-a
    echo "c" > subrepo-a/index-for-subrepo-a.txt
    git add -A
    git commit -m "subrepo-a"
    mkdir -p subrepo-b
    echo "c" > subrepo-b/index-for-subrepo-b.txt
    git add -A
    git commit -m "subrepo-b"
  `)
})

afterEach(async () => {
  await fs.remove(path.join(__dirname, './example-repo'))
  await fs.remove(path.join(__dirname, './example-subrepo'))
  await fs.remove(path.join(__dirname, './example-subrepo-error'))
})

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  cwd: () => __dirname,
  stdout: {write: spy()},
  exit: spy()
})

test('subrepoCli: help', async () => {
  const args = getArgs(['--help'])
  await subrepoCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('subrepoCli: version', async () => {
  const args = getArgs(['--version'])
  await subrepoCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('subrepoCli', async () => {
  const argv = await stringArgv("node ./index.js --source './example-repo' --subpath './subrepo-a' --dest './example-subrepo'")
  await subrepoCli(getArgs(argv))
  const {stdout} = await execa.shell('git -C ./example-subrepo log --pretty=oneline')
  expect(stdout).not.toMatch('subrepo-b')
  expect(stdout).not.toMatch('init')
  expect(stdout).toMatch('subrepo-a')
})

test('subrepo: error', async () => {
  const argv = await stringArgv("node ./index.js -C '/this-dir-does-not-exit' --source './example-repo' --subpath './subrepo-a' --dest './example-subrepo'")
  const p = getArgs(argv)
  await subrepoCli(p)
  expect(p.exit.args[0][0]).toEqual(1)
})

test('subrepo: error', async () => {
  const argv = await stringArgv('node ./index.js')
  const p = getArgs(argv)
  await subrepoCli(p)
  expect(p.exit.args[0][0]).toEqual(1)
})
