'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExists = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pkg = require('@reggi/pkg.fs');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileExists = exports.fileExists = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filePath) {
    var lstat;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _pkg2.default.lstatAsync(filePath);

          case 3:
            lstat = _context.sent;
            return _context.abrupt('return', lstat.isFile());

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', false);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function fileExists(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = fileExists;
