'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = exports.write = exports.processMock = exports.processOverwrite = exports.processReset = exports.processPreserve = exports.mockStdinRead = exports.Stdio = undefined;
exports.replaceProperty = replaceProperty;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _stdio = require('./stdio');

var _stdio2 = _interopRequireDefault(_stdio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.Stdio = _stdio2.default;
function replaceProperty(obj, prop, value) {
  var prevDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: prevDescriptor.enumerable,
    writable: prevDescriptor.writable || Boolean(prevDescriptor.set),
    value: value
  });
  return prevDescriptor;
}

var mockStdinRead = exports.mockStdinRead = function mockStdinRead(message) {
  var gen = /*#__PURE__*/regeneratorRuntime.mark(function gen() {
    return regeneratorRuntime.wrap(function gen$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return message;

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, gen, this);
  });
  var it = gen();
  var callerFn = function callerFn(bool) {
    if (bool === 0) return null;
    var called = it.next().value;
    return called || null;
  };
  return callerFn;
};

var processPreserve = exports.processPreserve = function processPreserve() {
  var _process = process,
      stdin = _process.stdin,
      stdout = _process.stdout,
      exit = _process.exit,
      argv = _process.argv;

  return { stdin, stdout, exit, argv };
};

var processReset = exports.processReset = function processReset(_ref) {
  var stdin = _ref.stdin,
      stdout = _ref.stdout,
      exit = _ref.exit,
      argv = _ref.argv;

  replaceProperty(process, 'stdin', stdin);
  replaceProperty(process, 'stdout', stdout);
  process.argv = argv;
  process.exit = exit;
};

var processOverwrite = exports.processOverwrite = function processOverwrite(argv, _stdin) {
  replaceProperty(process, 'stdin', new _stdio2.default().stdin);
  process.stdin.read = mockStdinRead(_stdin);
  process.argv = ['node', './index'].concat(_toConsumableArray(argv));
  process.exit = _sinon2.default.spy();
  process.stdout.write = _sinon2.default.spy();
  return process;
};

var processMock = exports.processMock = function processMock(argv, _stdin) {
  var filename = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : './index.js';

  var _ref2 = new _stdio2.default(),
      stdin = _ref2.stdin;

  stdin.read = mockStdinRead(_stdin);
  return {
    argv: ['node', filename].concat(_toConsumableArray(argv)),
    stdin,
    exit: _sinon2.default.spy(),
    stdout: { write: _sinon2.default.spy() }
  };
};

var write = exports.write = process.stdout.write;

var log = exports.log = function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  write(_util2.default.format.apply(null, args) + '\n');
};
