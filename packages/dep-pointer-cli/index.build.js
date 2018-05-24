#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _depPointer = require('@reggi/dep-pointer');

var _depPointer2 = _interopRequireDefault(_depPointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('dep-pointer-cli');

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('dep-pointer').description('Tool for assigning version from file references').option('--all', 'modify all packages dependency pointers', 'all').option('--changed', 'modify all changed packages dependency pointers', 'changed').option('--package <name>', 'specify package to modify dependency pointers', 'package').option('--local', 'swaps backup for package.json', 'local').option('--backup', 'backsup package.json', 'backup').option('--savePrefix <string>', 'string prefix for version', 'savePrefix').option('--help, -h', 'generate this output', 'help').option('--version, -v', 'show version number', 'version').option('--silent, -s', 'log no output', 'silent').parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        stdout = _ref.stdout,
        exit = _ref.exit,
        cwd = _ref.cwd;
    var design, pkg, all, changed, packageName, useLocal, backupLocal, workingDir, savePrefix;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            d('command started');
            design = getDesign(argv);

            d('design fetched');

            if (!design.flags.help) {
              _context.next = 9;
              break;
            }

            d('help hit');
            stdout.write(design.help() + '\n');
            return _context.abrupt('return', exit(0));

          case 9:
            if (!design.flags.version) {
              _context.next = 16;
              break;
            }

            d('version hit');
            pkg = require('./package.json');

            stdout.write(pkg.version + '\n');
            return _context.abrupt('return', exit(0));

          case 16:
            all = design.flags.all;
            changed = design.flags.changed;
            packageName = design.flags.package;
            useLocal = design.flags.local;
            backupLocal = design.flags.backup;
            workingDir = cwd();
            savePrefix = design.flags.savePrefix || '';
            _context.next = 25;
            return (0, _depPointer2.default)({ workingDir, savePrefix, all, changed, packageName, backupLocal, useLocal });

          case 25:
            return _context.abrupt('return', exit(0));

          case 26:
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
