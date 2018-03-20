import decache from 'decache'
import stringArgv from 'string-argv'
import mockCli from 'mock-cli'
import util from 'util'
import {Readable} from 'stream'

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

const mockCliAsync = (argv, stdio, fire, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    let timedout = false
    const timeoutTimer = setTimeout(() => {
      timedout = true
      unMockCli()
      return reject(new Error('timeout'))
    }, timeout)
    const unMockCli = mockCli(argv, stdio, (error, result) => {
      if (!timedout) {
        clearTimeout(timeoutTimer)
        if (error) {
          unMockCli()
          return reject(error)
        } else {
          unMockCli()
          return resolve(result)
        }
      }
    })
    fire()
  })
}

export const stdio = (stdin) => ({
  stdin: createReadableStream(stdin),
  stdout: process.stdout,
  stderr: process.stderr
})

export const cliTest = async (stdin, command, timeout) => {
  const parsedArgv = stringArgv(command)
  const fileToRequire = parsedArgv[1]
  const stdio = {
    stdin: createReadableStream(stdin),
    stdout: process.stdout,
    stderr: process.stderr
  }
  return mockCliAsync(parsedArgv, stdio, () => {
    try {
      delete require.cache[require.resolve(fileToRequire)]
      decache(fileToRequire)
    } catch (e) {}
    require(fileToRequire)
  }, timeout)
}

export default cliTest
