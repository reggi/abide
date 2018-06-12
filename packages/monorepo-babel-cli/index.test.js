import sinon from 'sinon'
import monorepoBabelCli from './index'

const getArgs = (argv) => ({
  argv,
  stdout: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => __dirname
})

test('monorepo-babel-cli: help', async () => {
  const args = getArgs(['node', './index', '--help'])
  await monorepoBabelCli(args)
  expect(args.stdout.write.called).toBeTruthy()
  expect(args.exit.called).toBeTruthy()
  expect(args.stdout.write.firstCall.args).toMatchSnapshot()
  expect(args.exit.firstCall.args).toEqual([0])
})

test('monorepo-babel-cli: version', async () => {
  const args = getArgs(['node', './index', '--version'])
  await monorepoBabelCli(args)
  expect(args.stdout.write.called).toEqual(true)
  expect(args.exit.called).toEqual(true)
  expect(args.exit.args[0][0]).toEqual(0)
})
