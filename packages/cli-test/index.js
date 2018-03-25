// import decache from 'decache'
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

const mockCliAsync = (argv, stdio, asserts) => {
  return new Promise((resolve, reject) => {
    const unMockCli = mockCli(argv, stdio, (error, result) => {
      if (error) return reject(error)
      asserts(result)
      return resolve({...result, unMockCli})
    })
  })
}

export const cliTest = async (stdin, command, asserts) => {
  const parsedArgv = stringArgv(command)
  const fileToRequire = parsedArgv[1]
  const stdio = {
    stdin: createReadableStream(stdin),
    stdout: process.stdout,
    stderr: process.stderr
  }
  const results = await mockCliAsync(parsedArgv, stdio, asserts)
  delete require.cache[require.resolve(fileToRequire)]
  require(fileToRequire)
  return results
}

export default cliTest
