#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _depMerge = require('@reggi/dep-merge');

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('dep-merge').description('Tool for merging devDependencies into dependencies').option('--merge', 'merges devDependencies into dependencies', 'merge').option('--unmerge', 'unmerges devDependencies from dependencies', 'unmerge').option('--path, -C <path>', 'path to node module directory', 'path').option('--help, -h', 'generate this output', 'help').option('--version, -v', 'show version number', 'version').option('--silent, -s', 'log no output', 'silent').parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        stdout = _ref.stdout,
        exit = _ref.exit;
    var design, pkg;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);

            if (!design.flags.help) {
              _context.next = 6;
              break;
            }

            stdout.write(design.help() + '\n');
            return _context.abrupt('return', exit(0));

          case 6:
            if (!design.flags.version) {
              _context.next = 12;
              break;
            }

            pkg = require('./package.json');

            stdout.write(pkg.version + '\n');
            return _context.abrupt('return', exit(0));

          case 12:
            if (!((design.flags.merge || design.flags.unmerge) && !design.flags.path)) {
              _context.next = 17;
              break;
            }

            stdout.write('missing path');
            return _context.abrupt('return', exit(1));

          case 17:
            if (!design.flags.merge) {
              _context.next = 31;
              break;
            }

            _context.prev = 18;
            _context.next = 21;
            return (0, _depMerge.depMerge)(design.flags.path);

          case 21:
            if (!design.flags.silent) stdout.write('dep-merge: done merging\n');
            return _context.abrupt('return', exit(0));

          case 25:
            _context.prev = 25;
            _context.t0 = _context['catch'](18);

            stdout.write(_context.t0.message);
            return _context.abrupt('return', exit(1));

          case 29:
            _context.next = 47;
            break;

          case 31:
            if (!design.flags.unmerge) {
              _context.next = 45;
              break;
            }

            _context.prev = 32;
            _context.next = 35;
            return (0, _depMerge.unDepMerge)(design.flags.path);

          case 35:
            if (!design.flags.silent) stdout.write('dep-merge: done unmerging\n');
            return _context.abrupt('return', exit(0));

          case 39:
            _context.prev = 39;
            _context.t1 = _context['catch'](32);

            stdout.write(_context.t1.message);
            return _context.abrupt('return', exit(1));

          case 43:
            _context.next = 47;
            break;

          case 45:
            if (!design.flags.silent) stdout.write('invalid arguments');
            return _context.abrupt('return', exit(1));

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 25], [32, 39]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
