#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _subrepo = require('@reggi/subrepo');

var _subrepo2 = _interopRequireDefault(_subrepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('subrepo').usage('[repo] [flags]').description('uses git filter-branch subdirectory-filter and clones the result').option('--source <repo>', 'source git repo', 'source').option('-C, --dir <path>', 'working directory', 'workingDir').option('--subpath, --subrepopath, --subdirectory-filter <path>', 'the path to the sub repo', 'subrepoPath').option('--dest, --destdir <path>', 'the path to the sub repo', 'destDir').option('-h, --help', 'show this output', 'help').option('--version, -v', 'show version number', 'version').parse(argv.slice(2));
};

var main = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;

    var design, source, workingDir, _design$flags, help, version, subrepoPath, destDir;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            source = design.flags.source || (0, _lodash.get)((0, _lodash.flattenDeep)(design.flags._), '0', false);
            workingDir = design.flags.workingDir || cwd();
            _design$flags = design.flags, help = _design$flags.help, version = _design$flags.version, subrepoPath = _design$flags.subrepoPath, destDir = _design$flags.destDir;

            if (!help) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', design.help());

          case 8:
            if (!version) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', require('./package.json').version);

          case 12:
            if (!(source && subrepoPath && destDir)) {
              _context.next = 18;
              break;
            }

            _context.next = 15;
            return (0, _subrepo2.default)({ workingDir, source, subrepoPath, destDir });

          case 15:
            return _context.abrupt('return', false);

          case 18:
            throw new Error('invalid arguments');

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function main(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = (0, _command2.default)(module, function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
    var argv = _ref3.argv,
        stdout = _ref3.stdout,
        cwd = _ref3.cwd,
        exit = _ref3.exit;
    var message;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return main({ argv, cwd });

          case 3:
            message = _context2.sent;

            if (message) stdout.write(message + '\n');
            return _context2.abrupt('return', exit(0));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            stdout.write(_context2.t0.message + '\n');
            return _context2.abrupt('return', exit(1));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}());
