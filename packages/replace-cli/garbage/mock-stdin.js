// const stdin = require('mock-stdin').stdin()
// const getStdin = require('get-stdin')

// const mockProcessStdinOnData = (event, callback) => {

// }
// const mockProcessStdinOnReadable = (event, callback) => {
  
// }

// const mockProcessStdinOn = (event, callback) => {
//   if (event === 'data') return mockProcessStdinOnData(event, callback)
//   if (event === 'readable') return mockProcessStdinOnReadable(event, callback)
// }

// const mockProcessStdin = () => {
//   return {
//     on: mockProcessStdinOn
//   }
// }

const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = () => {
    const called = it.next().value
    return called || null
  }
  return callerFn
}

require('../index')

process.stdin.read = mockStdinRead('james franco')
process.stdin.emit('readable')
process.stdin.emit('end')

// process.stdin = mockProcessStdin()
// require('./process-stdin-data.js')
