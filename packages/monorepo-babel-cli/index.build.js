#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lerna = require('@reggi/lerna.utils');

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('monorepo-babel').description(_package2.default.description).option('--output, -o', 'creates output of merged babel configs', 'output').option('--compare, -c', 'returns error code if does not match root babel', 'compare').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').parse(argv.slice(2));
};

var resolveBooleanResponse = function resolveBooleanResponse(b) {
  return {
    stdout: b ? 'valid' : 'invalid',
    exitCode: b ? 0 : 1
  };
};

var main = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;
    var design, workingDir;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            workingDir = cwd();

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
            if (!design.flags.output) {
              _context.next = 12;
              break;
            }

            _context.t0 = _stringify2.default;
            _context.next = 10;
            return (0, _lerna.lernaRootBabel)({ workingDir });

          case 10:
            _context.t1 = _context.sent.babelConfig;
            return _context.abrupt('return', (0, _context.t0)(_context.t1, null, 2));

          case 12:
            if (!design.flags.compare) {
              _context.next = 18;
              break;
            }

            _context.t2 = resolveBooleanResponse;
            _context.next = 16;
            return (0, _lerna.lernaRootBabelCompare)({ workingDir });

          case 16:
            _context.t3 = _context.sent;
            return _context.abrupt('return', (0, _context.t2)(_context.t3));

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
        cwd = _ref3.cwd,
        exit = _ref3.exit,
        stdout = _ref3.stdout,
        stderr = _ref3.stderr;
    var results;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return main({ argv, cwd });

          case 3:
            results = _context2.sent;

            if (!(0, _lodash.isString)(results)) {
              _context2.next = 9;
              break;
            }

            stdout.write(results + '\n');
            return _context2.abrupt('return', exit(0));

          case 9:
            if (!(0, _lodash.isPlainObject)(results)) {
              _context2.next = 15;
              break;
            }

            if (results.stdout) stdout.write(results.stdout + '\n');
            if (results.stderr) stderr.write(results.stderr + '\n');

            if (!results.exit) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', exit(results.exit));

          case 14:
            return _context2.abrupt('return', exit(0));

          case 15:
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](0);

            stdout.write(_context2.t0.message + '\n');
            return _context2.abrupt('return', exit(1));

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 17]]);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}());
