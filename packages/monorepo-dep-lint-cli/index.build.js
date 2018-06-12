#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lerna = require('@reggi/lerna.utils');

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('monorepo-dep-audit');

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('monorepo-dep-audit').description(_package2.default.description).option('--showFix, -f', 'shows possible fixes', 'showFix').option('--silent, -s', 'silent output', 'silent').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        stdout = _ref.stdout,
        stderr = _ref.stderr,
        cwd = _ref.cwd,
        exit = _ref.exit;

    var design, _pkg, results;

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
            _context.next = 16;
            return (0, _lerna.lernaDepAudit)({ workingDir: cwd() });

          case 16:
            results = _context.sent;

            if (results.length) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return', exit(0));

          case 19:
            if (!design.flags.silent) {
              results.forEach(function (e) {
                stderr.write(`${e.message}\n`);
                if (design.flags.showFix) stderr.write(`\t ${e.fix}\n`);
              });
            }
            return _context.abrupt('return', exit(1));

          case 21:
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
