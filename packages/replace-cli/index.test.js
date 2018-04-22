import sinon from 'sinon'
import replaceCli from './index'
import EventEmitter from 'events'

const getArgs = (argv, pipe) => {
  const stdin = new EventEmitter()
  return {
    argv: ['node', './index.js', ...argv],
    stdin: {
      setEncoding: sinon.spy(),
      on: sinon.spy(stdin.on),
      emit: sinon.spy(stdin.emit)
    },
    stdout: {write: sinon.spy()},
    exit: sinon.spy()
  }
}

test('replaceCli: main', async () => {
  const args = getArgs(['franco', 'dean'])
  replaceCli(args)
  args.stdin.emit('data', 'james franco')
  args.stdin.emit('end')
  expect(args.stdin.setEncoding.called).toEqual(true)
  expect(args.stdin.on.callCount).toEqual(2)
  expect(args.stdout.write.called).toEqual(true)
  expect(args.stdout.write.args[0][0]).toEqual('james dean')
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(0)
})

test('replaceCli: no stdin', async () => {
  const args = getArgs(['franco', 'dean'])
  replaceCli(args)
  args.stdin.emit('end')
  expect(args.stdin.setEncoding.called).toEqual(true)
  expect(args.stdin.on.callCount).toEqual(2)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('replaceCli: no args, double stdin', async () => {
  const args = getArgs([])
  replaceCli(args)
  args.stdin.emit('data', 'james franco')
  args.stdin.emit('data', 'james franco')
  args.stdin.emit('end')
  expect(args.stdin.setEncoding.called).toEqual(true)
  expect(args.stdin.on.callCount).toEqual(2)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})

test('replaceCli: one arg, double stdin', async () => {
  const args = getArgs(['franco'])
  replaceCli(args)
  args.stdin.emit('data', 'james franco')
  args.stdin.emit('end')
  expect(args.stdin.setEncoding.called).toEqual(true)
  expect(args.stdin.on.callCount).toEqual(2)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args[0][0]).toBe(1)
})
