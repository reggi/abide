test('megatest', () => {
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
  
  delete require.cache[require.resolve('./index.js')]
  replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
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
  
  delete require.cache[require.resolve('./index.js')]
  replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
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
  
  replaceProperty(process, 'stdin', processStdin)
  process.stdout.write = processStdoutWrite
  process.exit = processExit
  process.argv = processArgv
  // console.log(storage)
})
