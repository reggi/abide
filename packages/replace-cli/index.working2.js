import Stdio from './stdio'
import sinon from 'sinon'
// import stdio from '@reggi/stdio'

const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = (bool) => {
    if (bool === 0) return null
    const called = it.next().value
    return called || null
  }
  return callerFn
}

const processMock = (_stdin, argv) => {
  const {stdin} = new Stdio()
  stdin.read = mockStdinRead(_stdin)
  return {
    argv: ['node', './index', ...argv],
    stdin,
    exit: sinon.spy(),
    stdout: {write: sinon.spy()}
  }
}

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
})

test('replace-cli: example [james franco] to [james dean]', () => {
  const mock = processMock('james franco', ['franco', 'dean'])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(0)
  expect(mock.stdout.write.called).toEqual(true)
  expect(mock.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})

test('replace-cli: example [james franco] to [dave franco]', () => {
  const mock = processMock('james franco', ['james', 'dave'])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(0)
  expect(mock.stdout.write.called).toEqual(true)
  expect(mock.stdout.write.args.slice(-1)[0][0]).toEqual('dave franco')
})

test('replace-cli: example exit 1 no args', () => {
  const mock = processMock('james franco', [])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(1)
  expect(mock.stdout.write.called).toEqual(false)
  expect(mock.stdout.write.args.slice(-1)).toEqual([])
})

test('replace-cli: example exit 1 no stdin', () => {
  const mock = processMock('', ['james', 'dave'])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(1)
  expect(mock.stdout.write.called).toEqual(false)
  expect(mock.stdout.write.args.slice(-1)).toEqual([])
})

test('replace-cli: example exit 1 invalid args', () => {
  const mock = processMock('james franco', ['sel/\\', 'dave'])
  jest.doMock('./process', () => mock)
  require('./index')
  mock.stdin.emit('readable')
  mock.stdin.emit('end')
  expect(mock.exit.called).toEqual(true)
  expect(mock.exit.args[0][0]).toEqual(1)
  expect(mock.stdout.write.called).toEqual(false)
  expect(mock.stdout.write.args.slice(-1)).toEqual([])
})
