import {ReadStream} from 'tty'
import {Socket} from 'net'
import {Duplex, Readable} from 'stream'
import Stdio from './index'
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
}

const {stdin} = new Stdio()
stdinTest(stdin)
stdinTest(process.stdin)
