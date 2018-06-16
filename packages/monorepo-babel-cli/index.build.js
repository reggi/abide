#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _lerna = require('@reggi/lerna.utils');

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _commandPlus = require('@reggi/command-plus');

var _commandPlus2 = _interopRequireDefault(_commandPlus);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('monorepo-babel').description(_package2.default.description).option('--output, -o', 'creates output of merged babel configs', 'output').option('--compare, -c', 'returns error code if does not match root babel', 'compare').option('--silent, -s', 'silent output', 'silent').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').parse(argv.slice(2));
};

exports.default = (0, _commandPlus2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;

    var design, workingDir, silent, _ref3, babelConfig, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            workingDir = cwd();
            silent = design.flags.silent;

            if (!design.flags.help) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', design.help());

          case 5:
            if (!design.flags.version) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', _package2.default.version);

          case 7:
            if (!design.flags.output) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return (0, _lerna.lernaRootBabel)({ workingDir });

          case 10:
            _ref3 = _context.sent;
            babelConfig = _ref3.babelConfig;
            return _context.abrupt('return', babelConfig);

          case 13:
            if (!design.flags.compare) {
              _context.next = 22;
              break;
            }

            _context.next = 16;
            return (0, _lerna.lernaRootBabelCompare)({ workingDir });

          case 16:
            result = _context.sent;

            if (!(result && silent)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return', result);

          case 19:
            if (!(!result && !silent)) {
              _context.next = 21;
              break;
            }

            throw new Error('invalid root babel config');

          case 21:
            return _context.abrupt('return', 'valid babel config');

          case 22:
            throw new Error('invalid arguments');

          case 23:
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
