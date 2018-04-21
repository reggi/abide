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

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _depMerge = require('@reggi/dep-merge');

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('dep-merge-cli');

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
            if (!((design.flags.merge || design.flags.unmerge) && !design.flags.path)) {
              _context.next = 22;
              break;
            }

            d('missing path hit');
            stdout.write('missing path');
            return _context.abrupt('return', exit(1));

          case 22:
            if (!design.flags.merge) {
              _context.next = 39;
              break;
            }

            _context.prev = 23;

            d('merge attempting');
            _context.next = 27;
            return (0, _depMerge.depMerge)(design.flags.path);

          case 27:
            d('merge success');
            if (!design.flags.silent) stdout.write('dep-merge: done merging\n');
            return _context.abrupt('return', exit(0));

          case 32:
            _context.prev = 32;
            _context.t0 = _context['catch'](23);

            d('merge error');
            stdout.write(_context.t0.message);
            return _context.abrupt('return', exit(1));

          case 37:
            _context.next = 59;
            break;

          case 39:
            if (!design.flags.unmerge) {
              _context.next = 56;
              break;
            }

            _context.prev = 40;

            d('unmerge attempting');
            _context.next = 44;
            return (0, _depMerge.unDepMerge)(design.flags.path);

          case 44:
            d('unmerge success');
            if (!design.flags.silent) stdout.write('dep-merge: done unmerging\n');
            return _context.abrupt('return', exit(0));

          case 49:
            _context.prev = 49;
            _context.t1 = _context['catch'](40);

            d('unmerge error');
            stdout.write(_context.t1.message);
            return _context.abrupt('return', exit(1));

          case 54:
            _context.next = 59;
            break;

          case 56:
            d('else case');
            if (!design.flags.silent) stdout.write('invalid arguments');
            return _context.abrupt('return', exit(1));

          case 59:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[23, 32], [40, 49]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
