const mockCli = require('mock-cli')
const {Readable} = require('stream')
const util = require('util')
const fs = require('fs')

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

var unmockCli
afterEach(() => {
  if (unmockCli) {
    unmockCli()
    unmockCli = null
  }
})

test('replace: exit 0', (done) => {
  unmockCli = mockCli(['node', 'index', 'World', 'Thomas'], {
    stdin: createReadableStream('Hello World!'),
    stdout: process.stdout,
    stderr: process.stderr
  }, (error, {stdout, code}) => {
    if (error) throw error
    expect(stdout).toEqual('Hello Thomas!')
    expect(code).toEqual(0)
    return done()
  })
  require('./index')
})
