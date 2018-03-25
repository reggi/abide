const mockCli = require('mock-cli')
const {Readable} = require('stream')
const util = require('util')
const fs = require('fs')

;

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, () => console.log('hey'))
})

const createReadableStream = (input, callback) => {
  input = input || null
  function ReadableStream (options) {
    Readable.call(this, options)
  }
  util.inherits(ReadableStream, Readable)
  ReadableStream.prototype._read = function (size) {
    if (callback) callback(input)
    this.push(input)
    input = null
  }
  return new ReadableStream()
}

test('replace: exit 1', (done) => {
  const unmockCli = mockCli(['node', 'index', 'World', 'Thomas'], {
    stdin: createReadableStream(''),
    stdout: process.stdout,
    stderr: process.stderr
  }, (error, {stdout, code}) => {
    if (error) throw error
    expect(stdout).toEqual('')
    expect(code).toEqual(1)
    return done()
  })
  const x = () => require('./index')
  x()
  unmockCli()
})
