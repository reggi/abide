import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import subrepo from './index'

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

test('subrepo', async () => {
  await subrepo({
    source: './example-repo',
    workingDir: process.cwd(),
    subrepoPath: './subrepo-a',
    destDir: './example-subrepo'
  })
  const {stdout} = await execa.shell('git -C ./example-subrepo log --pretty=oneline')
  expect(stdout).not.toMatch('subrepo-b')
  expect(stdout).not.toMatch('init')
  expect(stdout).toMatch('subrepo-a')
})

test('subrepo: error', async () => {
  try {
    await subrepo({
      source: path.join(__dirname, './example-repo'),
      workingDir: '/this-dir-does-not-exit',
      subrepoPath: './subrepo-a',
      destDir: './example-subrepo-error'
    })
  } catch (e) {
    expect(e.message).toMatch('permission denied, mkdir \'/this-dir-does-not-exit\'')
  }
  expect.assertions(1)
})
