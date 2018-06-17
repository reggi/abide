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

var _commandPlus = require('@reggi/command-plus');

var _commandPlus2 = _interopRequireDefault(_commandPlus);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _subrepo = require('@reggi/subrepo');

var _subrepo2 = _interopRequireDefault(_subrepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('subrepo').usage('[repo] [flags]').description('uses git filter-branch subdirectory-filter and clones the result').option('--source <repo>', 'source git repo', 'source').option('-C, --dir <path>', 'working directory', 'workingDir').option('--subpath, --subrepopath, --subdirectory-filter <path>', 'the path to the sub repo', 'subrepoPath').option('--dest, --destdir <path>', 'the path to the sub repo', 'destDir').option('-h, --help', 'show this output', 'help').option('--version, -v', 'show version number', 'version').parse(argv.slice(2));
};

exports.default = (0, _commandPlus2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        stdout = _ref.stdout,
        cwd = _ref.cwd,
        exit = _ref.exit;

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
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', design.help());

          case 6:
            if (!version) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', require('./package.json').version);

          case 8:
            if (!(source && subrepoPath && destDir)) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return (0, _subrepo2.default)({ workingDir, source, subrepoPath, destDir });

          case 11:
            return _context.abrupt('return', true);

          case 12:
            throw new Error('invalid arguments');

          case 13:
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
