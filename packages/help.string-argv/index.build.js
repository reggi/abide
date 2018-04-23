'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringArgv = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringArgv = exports.stringArgv = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_stringArgv) {
    var command, results;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            command = 'node -e "console.log(JSON.stringify(process.argv.slice(2)))" index.js';
            _context.next = 3;
            return (0, _execa2.default)('sh', ['-c', `${command} ${_stringArgv}`]);

          case 3:
            results = _context.sent;
            return _context.abrupt('return', JSON.parse(results.stdout));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function stringArgv(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = stringArgv;
