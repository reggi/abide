import {
  processPreserve,
  processReset,
  processOverwrite,
  processMock,
  log
} from './index'

/* eslint-disable no-global-assign */

const preserve = processPreserve()

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
  processReset(preserve)
})

test('process.mock: (data) example [james franco] to [james dean]', () => {
  process = processOverwrite(['franco', 'dean'])
  require('./example-process-stdin-data.js')
  process.stdin.emit('data', 'james franco')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})

test('process.mock: (data) example [james franco] to [dave franco]', () => {
  process = processOverwrite(['james', 'dave'])
  require('./example-process-stdin-data.js')
  process.stdin.emit('data', 'james franco')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('dave franco')
})

test('process.mock: (data) example exit 1 no args', () => {
  process = processOverwrite([])
  require('./example-process-stdin-data.js')
  process.stdin.emit('data', 'james franco')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('process.mock: (data) example exit 1 no stdin', () => {
  process = processOverwrite(['james', 'dave'])
  require('./example-process-stdin-data.js')
  process.stdin.emit('data', '')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('process.mock: (data) example exit 1 invalid args', () => {
  process = processOverwrite(['sel/\\', 'dave'])
  require('./example-process-stdin-data.js')
  process.stdin.emit('data', 'james franco')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('process.mock: (readable) example [james franco] to [james dean]', () => {
  process = processOverwrite(['franco', 'dean'], 'james franco')
  require('./example-process-stdin-readable.js')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('james dean')
})

test('process.mock: (readable) example [james franco] to [dave franco]', () => {
  process = processOverwrite(['james', 'dave'], 'james franco')
  require('./example-process-stdin-readable.js')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual('dave franco')
})

test('process.mock: (readable) example exit 1 no args', () => {
  process = processOverwrite([], 'james franco')
  require('./example-process-stdin-readable.js')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('process.mock: (readable) example exit 1 no stdin', () => {
  process = processOverwrite(['james', 'dave'], '')
  require('./example-process-stdin-readable.js')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('process.mock: (readable) example exit 1 invalid args', () => {
  process = processOverwrite(['sel/\\', 'dave'], 'james franco')
  require('./example-process-stdin-readable.js')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(1)
  expect(process.stdout.write.called).toEqual(false)
  expect(process.stdout.write.args.slice(-1)).toEqual([])
})

test('processMock', () => {
  processMock(['james', 'dave'], 'james franco', './index.js')
  processMock(['james', 'dave'], 'james franco')
})

test('log', () => {
  log('hello world')
})
