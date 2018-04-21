const tty = require('tty')

export function getStdout () {
  var stdout
  const fd = 1
  stdout = new tty.WriteStream(fd)
  stdout._type = 'tty'
  stdout.fd = fd
  stdout._isStdio = true
  stdout.destroySoon = stdout.destroy
  stdout._destroy = function (er, cb) {
    // Avoid errors if we already emitted
    er = er || new Error('ERR_STDOUT_CLOSE')
    cb(er)
  }
  // process.on('SIGWINCH', () => stdout._refreshSize())
  return stdout
}

export function getStderr () {
  var stderr
  const fd = 2
  stderr = new tty.WriteStream(fd)
  stderr._type = 'tty'
  stderr.fd = fd
  stderr._isStdio = true
  stderr.destroySoon = stderr.destroy
  stderr._destroy = function (er, cb) {
    // Avoid errors if we already emitted
    er = er || new Error('ERR_STDOUT_CLOSE')
    cb(er)
  }
  process.on('SIGWINCH', () => stderr._refreshSize())
  return stderr
}

export function getStdin () {
  var stdin
  const fd = 0
  stdin = new tty.ReadStream(fd, {
    highWaterMark: 0,
    readable: true,
    writable: false
  })
  stdin.fd = fd
  stdin.on('pause', () => {
    if (!stdin._handle) { return }
    stdin._readableState.reading = false
    stdin._handle.reading = false
    stdin._handle.readStop()
  })
  return stdin
}

export function setupStdio () {
  return {
    stdout: getStdout(),
    stderr: getStderr(),
    getStdin: getStdin()
  }
}

export const stdio = setupStdio
export default stdio
