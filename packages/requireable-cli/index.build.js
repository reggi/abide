#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requireable = require('@reggi/requireable');

var _requireable2 = _interopRequireDefault(_requireable);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('requireable').usage('[flags] [modulePath]').description('Check and see if a module is requireable in node').option('--module <path>', 'path to the local module', 'module').option('--node <path>', 'path to the node binary', 'nodeBin').option('--npmClient <path>', 'path to the npm client', 'npmClient').option('--verbose', 'show debug content', 'verbose').option('--inherit, -i', 'show debug content', 'inherit').option('--help, -h', 'generate this output', 'help').option('--version, -v', 'show version number', 'version').option('--silent, -s', 'no output', 'silent').parse(argv.slice(2));
};

var main = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv;

    var design, modPath, _design$flags, nodeBin, npmClient, inherit;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);

            if (design.flags.verbose) process.env['DEBUG'] = 'requireable-cli,requireable:*';
            modPath = design.flags.module || (0, _lodash.get)((0, _lodash.flattenDeep)(design.flags._), '0') || false;

            if (!design.flags.help) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', design.help());

          case 7:
            if (!design.flags.version) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', require('./package.json').version);

          case 11:
            if (!modPath) {
              _context.next = 18;
              break;
            }

            _design$flags = design.flags, nodeBin = _design$flags.nodeBin, npmClient = _design$flags.npmClient, inherit = _design$flags.inherit;
            _context.next = 15;
            return (0, _requireable2.default)({ modPath, nodeBin, npmClient, inherit });

          case 15:
            return _context.abrupt('return', false);

          case 18:
            throw new Error('invalid argument');

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
        exit = _ref3.exit,
        stdout = _ref3.stdout;
    var message;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return main({ argv });

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
