'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commandPlus = exports.commandPlusHandler = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandPlusHandler = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var main = _ref.main,
        p = (0, _objectWithoutProperties3.default)(_ref, ['main']);
    var stdout, stderr, exit, results;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdout = p.stdout, stderr = p.stderr, exit = p.exit;
            _context.prev = 1;
            _context.next = 4;
            return main(p);

          case 4:
            results = _context.sent;

            if (!(results === true)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', exit(0));

          case 9:
            if (!(results === false)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', exit(1));

          case 13:
            if (!(typeof results === 'string' || typeof results === 'number')) {
              _context.next = 18;
              break;
            }

            stdout.write(results + '\n');
            return _context.abrupt('return', exit(0));

          case 18:
            stdout.write((0, _stringify2.default)(results, null, 2) + '\n');
            return _context.abrupt('return', exit(0));

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](1);

            stderr.write(`${_context.t0.message}\n`);
            return _context.abrupt('return', exit(1));

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 22]]);
  }));

  return function commandPlusHandler(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.commandPlusHandler = commandPlusHandler;
var commandPlus = exports.commandPlus = function commandPlus(module, main) {
  var _process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process;

  return (0, _command2.default)(module, function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_process) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', commandPlusHandler((0, _extends3.default)({ main }, _process)));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }(), _process);
};

exports.default = commandPlus;
