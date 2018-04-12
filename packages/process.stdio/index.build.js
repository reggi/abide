'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStdout = getStdout;
exports.getStderr = getStderr;
exports.getStdin = getStdin;
exports.setupStdio = setupStdio;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tty = require('tty');

function getStdout() {
  var stdout;
  var fd = 1;
  stdout = new tty.WriteStream(fd);
  stdout._type = 'tty';
  stdout.fd = fd;
  stdout._isStdio = true;
  stdout.destroySoon = stdout.destroy;
  stdout._destroy = function (er, cb) {
    // Avoid errors if we already emitted
    er = er || new Error('ERR_STDOUT_CLOSE');
    cb(er);
  };
  process.on('SIGWINCH', function () {
    return stdout._refreshSize();
  });
  return stdout;
}

function getStderr() {
  var stderr;
  var fd = 2;
  stderr = new tty.WriteStream(fd);
  stderr._type = 'tty';
  stderr.fd = fd;
  stderr._isStdio = true;
  stderr.destroySoon = stderr.destroy;
  stderr._destroy = function (er, cb) {
    // Avoid errors if we already emitted
    er = er || new Error('ERR_STDOUT_CLOSE');
    cb(er);
  };
  process.on('SIGWINCH', function () {
    return stderr._refreshSize();
  });
  return stderr;
}

function getStdin() {
  var stdin;
  var fd = 0;
  stdin = new tty.ReadStream(fd, {
    highWaterMark: 0,
    readable: true,
    writable: false
  });
  stdin.fd = fd;
  stdin.on('pause', function () {
    if (!stdin._handle) {
      return;
    }
    stdin._readableState.reading = false;
    stdin._handle.reading = false;
    stdin._handle.readStop();
  });
  return stdin;
}

function setupStdio() {
  var stdio = {};

  Object.defineProperty(stdio, 'stdout', {
    configurable: true,
    enumerable: true,
    get: getStdout
  });

  Object.defineProperty(stdio, 'stderr', {
    configurable: true,
    enumerable: true,
    get: getStderr
  });

  Object.defineProperty(stdio, 'stdin', {
    configurable: true,
    enumerable: true,
    get: getStdin
  });

  return stdio;
}

var Stdio = function Stdio() {
  _classCallCheck(this, Stdio);

  return setupStdio();
};

exports.default = Stdio;
