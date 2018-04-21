import sinon from 'sinon'
import {ReadStream} from 'tty'
import {Socket} from 'net'
import {Duplex, Readable} from 'stream'
import stdio from './index'
import assert from 'assert'

const stdinTest = (stdin) => {
  assert.equal(stdin instanceof ReadStream, true)
  assert.equal(stdin instanceof Socket, true)
  assert.equal(stdin instanceof Readable, true)
  assert.equal(stdin instanceof Duplex, true)
  assert.equal(typeof stdin.setEncoding === 'function', true)
  assert.equal(typeof stdin.on === 'function', true)
  assert.equal(typeof stdin.emit === 'function', true)
  assert.equal(typeof stdin.read === 'function', true)
  assert.equal(typeof stdin.resume === 'function', true)
  assert.equal(stdin.emit('pause'), true)
  assert.equal(stdin.fd, 0)
}

const stdoutTest = (stdout) => {
  assert.equal(typeof stdout.write === 'function', true)
  assert.equal(stdout.write('hello world'), true)
}

const stderrTest = (stderr) => {
  assert.equal(typeof stderr.write === 'function', true)
  assert.equal(stderr.write('hello world'), true)
  assert.equal(typeof stderr.destroy, 'function')
  assert.equal(typeof stderr.destroySoon, 'function')
  assert.equal(typeof stderr._destroy, 'function')
}

test('stdin', () => {
  const {stdin} = stdio()
  stdinTest(stdin)
  stdinTest(process.stdin)
})

test('stdin: pause with prop', () => {
  const {stdin} = stdio()
  stdin._handle.readStop = sinon.spy()
  stdin.emit('pause')
  expect(stdin._handle.readStop.called).toEqual(true)
  stdin.emit('end')
})

test('stdin: pause without', () => {
  const {stdin} = stdio()
  const handle = stdin._handle
  stdin._handle = false
  expect(stdin.emit('pause')).toEqual(true)
  stdin._handle = handle
  stdin.emit('end')
})

test('stderr: _destroy', () => {
  const {stderr} = stdio()
  const spyOne = sinon.spy()
  stderr._destroy(new Error(), spyOne)
  expect(spyOne.called).toBe(true)
  const spyTwo = sinon.spy()
  stderr._destroy(false, spyTwo)
  expect(spyTwo.called).toBe(true)
})

test('stdout: _destroy', () => {
  const {stdout} = stdio()
  const spyOne = sinon.spy()
  stdout._destroy(new Error(), spyOne)
  expect(spyOne.called).toBe(true)
  const spyTwo = sinon.spy()
  stdout._destroy(false, spyTwo)
  expect(spyTwo.called).toBe(true)
})

test('stdout', () => {
  const {stdout} = stdio()
  stdoutTest(stdout)
  stdoutTest(process.stdout)
})

test('stderr', () => {
  const {stderr} = stdio()
  stderrTest(stderr)
  stderrTest(process.stderr)
})

test('stderr: _refreshSize.called on process.emit(SIGWINCH)', () => {
  const {stderr} = stdio()
  stderr._refreshSize = sinon.spy()
  process.emit('SIGWINCH')
  expect(stderr._refreshSize.called).toEqual(true)
})
