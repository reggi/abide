import {
  processPreserve,
  processReset,
  processOverwrite
} from '@reggi/process-mock'

/* eslint-disable no-global-assign */

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
