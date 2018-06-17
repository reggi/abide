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

var _commandPlus = require('@reggi/command-plus');

var _commandPlus2 = _interopRequireDefault(_commandPlus);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('monorepo-dep-lint').description(_package2.default.description).option('--showFix, -f', 'shows possible fixes', 'showFix').option('--silent, -s', 'silent output', 'silent').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').parse(argv.slice(2));
};

var output = function output(_ref) {
  var errors = _ref.errors,
      showFix = _ref.showFix;

  var output = [];
  errors.forEach(function (e) {
    output.push(`${e.message}`);
    if (showFix) output.push(`\t${e.fix}`);
  });
  return output.join('\n');
};

exports.default = (0, _commandPlus2.default)(module, function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var argv = _ref2.argv,
        cwd = _ref2.cwd;
    var design, workingDir, silent, showFix, errors;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            workingDir = cwd();
            silent = design.flags.silent;
            showFix = design.flags.showFix;

            if (!design.flags.help) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', design.help());

          case 6:
            if (!design.flags.version) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', _package2.default.version);

          case 8:
            _context.next = 10;
            return (0, _lerna.lernaDepAudit)({ workingDir });

          case 10:
            errors = _context.sent;

            if (errors.length) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', true);

          case 13:
            if (!silent) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', false);

          case 15:
            throw new Error(output({ errors, showFix }));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
