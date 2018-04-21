#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pkg2 = require('@reggi/pkg');

var _pkg3 = _interopRequireDefault(_pkg2);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('pkg-cli');

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('pkg').description('Generate a package.json based on plugins').option('--write, -w', 'writes output to package.json file', 'write').option('--output, -o', 'writes output to stdout', 'output').option('--plugin <module>', 'path to pkg plugin', 'plugin').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').option('--dir, -C <path>', 'path to use as working directory', 'workingDir').option('--silent, -s', 'silent the command', 'silent').parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        stdout = _ref.stdout,
        cwd = _ref.cwd,
        exit = _ref.exit;

    var design, _pkg, workingDir, plugin, output, write;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);

            if (!design.flags.help) {
              _context.next = 7;
              break;
            }

            d('help hit');
            stdout.write(design.help() + '\n');
            return _context.abrupt('return', exit(0));

          case 7:
            if (!design.flags.version) {
              _context.next = 14;
              break;
            }

            d('version hit');
            _pkg = require('./package.json');

            stdout.write(_pkg.version + '\n');
            return _context.abrupt('return', exit(0));

          case 14:
            workingDir = design.flags.workingDir || cwd();
            plugin = design.flags.plugin;
            output = design.flags.output;
            write = design.flags.write;
            _context.prev = 18;
            _context.next = 21;
            return (0, _pkg3.default)({ workingDir, plugin, write, stdout: output, argv });

          case 21:
            return _context.abrupt('return', exit(0));

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](18);

            stdout.write(_context.t0.message + '\n');
            return _context.abrupt('return', exit(1));

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 24]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
