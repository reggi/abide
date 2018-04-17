'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringArgv = undefined;

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var stringArgv = exports.stringArgv = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_stringArgv) {
    var command, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
