import Stdio from './stdio'
import sinon from 'sinon'
// import stdio from '@reggi/stdio'

function replaceProperty (obj, prop, value) {
  var prevDescriptor = Object.getOwnPropertyDescriptor(obj, prop)
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: prevDescriptor.enumerable,
    writable: prevDescriptor.writable || Boolean(prevDescriptor.set),
    value: value
  })
  return prevDescriptor
}

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

const processPreserve = () => {
  const {stdin, stdout, exit, argv} = process
  return {stdin, stdout, exit, argv}
}

const processReset = ({stdin, stdout, exit, argv}) => {
  replaceProperty(process, 'stdin', stdin)
  replaceProperty(process, 'stdout', stdout)
  process.argv = argv
  process.exit = exit
}

const processOverwrite = (_stdin, argv) => {
  replaceProperty(process, 'stdin', new Stdio().stdin)
  process.stdin.read = mockStdinRead(_stdin)
  process.argv = ['node', './index', ...argv]
  process.exit = sinon.spy()
  process.stdout.write = sinon.spy()
  return process
}

const write = process.stdout.write
const log = (arg) => {
  write(JSON.stringify(arg) + '\n')
}

const preserve = processPreserve()

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
  processReset(preserve)
})

test('replace-cli: example [james franco] to [james dean]', () => {
  process = processOverwrite('james franco', ['franco', 'dean'])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})

test('replace-cli: example [james franco] to [dave franco]', () => {
  process = processOverwrite('james franco', ['james', 'dave'])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('dave franco')
})

test('replace-cli: example exit 1 no args', () => {
  process = processOverwrite('james franco', [])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('replace-cli: example exit 1 no stdin', () => {
  process = processOverwrite('', ['james', 'dave'])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('replace-cli: example exit 1 invalid args', () => {
  process = processOverwrite('james franco', ['sel/\\', 'dave'])
  require('./index')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})
