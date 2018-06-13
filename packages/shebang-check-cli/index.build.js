#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _shebangCheck = require('@reggi/shebang-check');

var _shebangCheck2 = _interopRequireDefault(_shebangCheck);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _commandPlus = require('@reggi/command-plus');

var _commandPlus2 = _interopRequireDefault(_commandPlus);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('shebang-check').description(_package2.default.description).option('--dir [dir]', 'directory to run in', 'directory').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').parse(argv.slice(2));
};

exports.default = (0, _commandPlus2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;
    var design, workingDir, results;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            workingDir = design.flags.directory || cwd();

            if (!design.flags.help) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', design.help());

          case 4:
            if (!design.flags.version) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', _package2.default.version);

          case 6:
            results = (0, _shebangCheck2.default)({ workingDir });
            return _context.abrupt('return', results);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
