import sinon from 'sinon'

const mockStdinRead = (message) => {
  const gen = function * () {
    yield message
  }
  const it = gen()
  const callerFn = (bool) => {
    // if (bool === 0) return null
    const called = it.next().value
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

afterEach(() => {
  replaceProperty(process, 'stdin', stdin)
  process.stdout.write = write
  process.exit = exit
  process.argv = argv
  delete require.cache[require.resolve('./index.js')]
  console.log(storage)
})

test('test two', () => {
  process.argv = ['node', '../index', 'james', 'dave']
  // process.exit = sinon.spy()
  replaceProperty(process, 'stdin', require('./stdio').setup().stdin)
  require('./index')
  process.stdout.write = sinon.spy()
  process.stdin.read = mockStdinRead('james franco')
  process.stdin.emit('readable')
  process.stdin.emit('end')
  expect(process.exit.called).toBe(true)
  expect(process.exit.args[0][0]).toBe(0)
  expect(process.stdout.write.called).toBe(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toBe('dave franco')
  storage.push(process.stdout.write.args)
})
