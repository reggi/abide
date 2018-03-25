const processStdio = require('@reggi/stdio')
const assert = require('assert')
const sinon = require('sinon')

function replaceProperty (obj, prop, value) {
  var prevDescriptor = Object.getOwnPropertyDescriptor(obj, prop)
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: prevDescriptor.enumerable,
    writable: prevDescriptor.writable || Boolean(prevDescriptor.set),
    value: value
  })
  return prevDescriptor
}

const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = (bool) => {
    if (bool === 0) return null
    const called = it.next().value
    return called || null
  }
  return callerFn
}

const storage = []
const processStdin = process.stdin
const processStdoutWrite = process.stdout.write
const processExit = process.exit
const processArgv = process.argv

// -----First Case-------------------------
delete require.cache[require.resolve('./index.js')]
replaceProperty(process, 'stdin', processStdio.setup().stdin)
process.argv = ['node', './index', 'franco', 'dean']
process.exit = sinon.spy()
process.stdout.write = sinon.spy()
require('./index')
process.stdin.read = mockStdinRead('james franco')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 0)
assert.equal(process.stdout.write.called, true)
assert.equal(process.stdout.write.args.slice(-1)[0][0], 'james dean')
storage.push(process.stdout.write.args)

// -----Second Case-------------------------
delete require.cache[require.resolve('./index.js')]
replaceProperty(process, 'stdin', processStdio.setup().stdin)
process.argv = ['node', './index', 'james', 'dave']
process.exit = sinon.spy()
process.stdout.write = sinon.spy()
require('./index')
process.stdin.read = mockStdinRead('james franco')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 0)
assert.equal(process.stdout.write.called, true)
assert.equal(process.stdout.write.args.slice(-1)[0][0], 'dave franco')
storage.push(process.stdout.write.args)

// -----Third Case-------------------------
delete require.cache[require.resolve('./index.js')]
replaceProperty(process, 'stdin', processStdio.setup().stdin)
process.argv = ['node', './index']
process.exit = sinon.spy()
process.stdout.write = sinon.spy()
require('./index')
process.stdin.read = mockStdinRead('james franco')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 1)
assert.equal(process.stdout.write.called, false)
assert.deepEqual(process.stdout.write.args.slice(-1), [])
storage.push(process.stdout.write.args)

// -----Fourth Case-------------------------
delete require.cache[require.resolve('./index.js')]
replaceProperty(process, 'stdin', processStdio.setup().stdin)
process.argv = ['node', './index', 'james', 'dave']
process.exit = sinon.spy()
process.stdout.write = sinon.spy()
require('./index')
process.stdin.read = mockStdinRead('')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 1)
assert.equal(process.stdout.write.called, false)
assert.deepEqual(process.stdout.write.args.slice(-1), [])
storage.push(process.stdout.write.args)

// -----Fifth Case-------------------------
delete require.cache[require.resolve('./index.js')]
replaceProperty(process, 'stdin', processStdio.setup().stdin)
process.argv = ['node', './index', 'sel/\\', 'dave']
process.exit = sinon.spy()
process.stdout.write = sinon.spy()
require('./index')
process.stdin.read = mockStdinRead('james franco')
process.stdin.emit('readable')
process.stdin.emit('end')
assert.equal(process.exit.called, true)
assert.equal(process.exit.args[0][0], 1)
assert.equal(process.stdout.write.called, false)
assert.deepEqual(process.stdout.write.args.slice(-1), [])
storage.push(process.stdout.write.args)

replaceProperty(process, 'stdin', processStdin)
process.stdout.write = processStdoutWrite
process.exit = processExit
process.argv = processArgv
console.log(storage)
