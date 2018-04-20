import util from 'util'
import sinon from 'sinon'
import Stdio from '@reggi/process.stdio'

export {Stdio}

export function replaceProperty (obj, prop, value) {
  var prevDescriptor = Object.getOwnPropertyDescriptor(obj, prop)
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: prevDescriptor.enumerable,
    writable: prevDescriptor.writable || Boolean(prevDescriptor.set),
    value: value
  })
  return prevDescriptor
}

export const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = (bool) => {
    // if (bool === 0) return null
    const called = it.next().value
    return called || null
  }
  return callerFn
}

export const processPreserve = () => {
  const {stdin, stdout, exit, argv} = process
  return {stdin, stdout, exit, argv}
}

export const processReset = ({stdin, stdout, exit, argv}) => {
  replaceProperty(process, 'stdin', stdin)
  replaceProperty(process, 'stdout', stdout)
  process.argv = argv
  process.exit = exit
}

export const processOverwrite = (argv, _stdin) => {
  replaceProperty(process, 'stdin', new Stdio().stdin)
  process.stdin.read = mockStdinRead(_stdin)
  process.argv = ['node', './index', ...argv]
  process.exit = sinon.spy()
  process.stdout.write = sinon.spy()
  return process
}

export const processMock = (argv, _stdin, filename = './index.js') => {
  const {stdin} = new Stdio()
  stdin.read = mockStdinRead(_stdin)
  return {
    argv: ['node', filename, ...argv],
    stdin,
    exit: sinon.spy(),
    stdout: {write: sinon.spy()}
  }
}

export const write = process.stdout.write

export const log = (...args) => {
  write(util.format.apply(null, args) + '\n')
}
