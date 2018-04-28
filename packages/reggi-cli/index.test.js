import {spy} from 'sinon'
import reggiCli from './index'

const getArgs = (argv) => ({
  argv: ['node', './index.js', ...argv],
  cwd: () => __dirname,
  stdout: {write: spy()},
  exit: spy()
})

test('reggiCli', async () => {
  const p = getArgs([])
  await reggiCli(p)
  expect(p.stdout.write.called).toBe(true)
  expect(p.exit.called).toBe(true)
  expect(p.exit.args[0][0]).toBe(0)
})

test('reggiCli: pkgprop --help example', async () => {
  const p = getArgs(['pkgprop', '--help'])
  await reggiCli(p)
  expect(p.stdout.write.called).toBe(true)
  expect(p.exit.called).toBe(true)
  expect(p.exit.args[0][0]).toBe(0)
})
