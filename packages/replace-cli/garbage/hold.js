const EventEmitter = require('events');
import sinon from 'sinon'

const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = (bool) => {
    console.log({bool})
    if (bool === 0) return null
    const called = it.next().value
    console.log({called})
    return called || null
  }
  return callerFn
}

const stdin = process.stdin
const write = process.stdout.write
const exit = process.exit
const argv = process.argv

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

const storage = []

const reset = () => {
  replaceProperty(process, 'stdin', stdin)
  process.stdout.write = write
  process.exit = exit
  process.argv = argv
  delete require.cache[require.resolve('./index.js')]
  console.log({storage})
}

// const one = () => {
//   process.argv = ['node', '../index', 'franco', 'dean']
//   process.exit = sinon.spy()
//   replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
//   require('./index')
//   process.stdout.write = sinon.spy()
//   process.stdin.read = mockStdinRead('james franco')
//   process.stdin.emit('readable')
//   process.stdin.emit('end')
//   expect(process.exit.called).toBe(true)
//   expect(process.exit.args[0][0]).toBe(0)
//   expect(process.stdout.write.called).toBe(true)
//   expect(process.stdout.write.args.slice(-1)[0][0]).toBe('james dean')
//   storage.push(process.stdout.write.args)
// }

const one = () => {
  return new Promise((resolve) => {
    // process.stdout.write = sinon.spy()
    delete require.cache[require.resolve('./index.js')]
    delete require.cache[require.resolve('./stdio')]
    process.argv = ['node', '../index', 'franco', 'dean']
    replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
    require('./index')
    process.stdin.read = mockStdinRead('james franco')
    process.exit = (code) => {
      expect(code).toBe(0)
      // expect(process.stdout.write.called).toBe(true)
      // expect(process.stdout.write.args.slice(-1)[0][0]).toBe('james dean')
      // storage.push(process.stdout.write.args)
      return resolve()
    }
    process.stdin.emit('readable')
    process.stdin.emit('end')
  })
}

const two = async () => {
  return new Promise((resolve) => {
    // process.stdout.write = sinon.spy()
    delete require.cache[require.resolve('./index.js')]
    delete require.cache[require.resolve('./stdio')]
    process.argv = ['node', '../index', 'james', 'dave']
    replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
    require('./index')
    process.stdin.read = mockStdinRead('james franco')
    process.exit = (code) => {
      expect(code).toBe(0)
      // expect(process.stdout.write.called).toBe(true)
      // expect(process.stdout.write.args.slice(-1)[0][0]).toBe('dave franco')
      // storage.push(process.stdout.write.args)
      return resolve()
    }
    process.stdin.emit('readable')
    process.stdin.emit('end')
  })
}

test('main', async () => {
  reset()
  await one()
  reset()
  await two()
})

afterAll(() => {
  reset()
})
