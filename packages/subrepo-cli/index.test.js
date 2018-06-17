import path from 'path'
import stringArgv from '@reggi/help.string-argv'
import {spy} from 'sinon'
import fs from 'fs-extra'
import execa from 'execa'
import subrepoCli from './index'

beforeEach(async () => {
  await fs.remove(path.join(__dirname, './example-repo'))
  await fs.remove(path.join(__dirname, './example-subrepo'))
  await fs.remove(path.join(__dirname, './example-subrepo-error'))
  await execa.shell(`
    cd ${__dirname}
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

const getArgs = (argv, workingDir) => ({
  argv,
  cwd: () => workingDir,
  stderr: {write: spy()},
  stdout: {write: spy()},
  exit: spy()
})

test('subrepoCli: help', async () => {
  const args = getArgs(['node', './index.js', '--help'])
  await subrepoCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('subrepoCli: version', async () => {
  const args = getArgs(['node', './index.js', '--version'])
  await subrepoCli(args)
  expect(args.stdout.write.called).toBe(true)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('subrepoCli', async () => {
  const source = './example-repo'
  const workingDir = __dirname
  const subrepoPath = './subrepo-a'
  const destDir = './example-subrepo'
  const pureArgs = await stringArgv(`node ./index.js --source ${source} --subpath ${subrepoPath} --dest ${destDir}`)
  const {argv, cwd, stderr, stdout, exit} = getArgs(pureArgs, workingDir)
  await subrepoCli(({argv, cwd, stderr, stdout, exit}))
  expect(stderr.write.args).toEqual([])
  expect(exit.called).toBe(true)
  expect(exit.args).toEqual([[0]])
  const check = await execa.shell(`git -C ${path.join(__dirname, destDir)} log --pretty=oneline`)
  expect(check.stdout).not.toMatch('init')
  expect(check.stdout).not.toMatch('subrepo-b')
  expect(check.stdout).toMatch('subrepo-a')
})

test('subrepo: error', async () => {
  const argv = await stringArgv(`node ./index.js -C ${path.join(__dirname, './invalid-working-directory')} --source ${path.join(__dirname, './example-repo')} --subpath ${path.join(__dirname, './subrepo-a')} --dest ${path.join(__dirname, './example-subrepo')}`)
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
