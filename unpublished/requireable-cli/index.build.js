#!/usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var design = (0, _help2.default)().name('requireable').description('Check and see if a module is requireable in node').option('--module <path>', 'path to the local module').option('--node <path>', 'path to the node binary').option('--verbose', 'show debug content').option('--help, -h', 'generate this output').option('--version, -v', 'show version number').option('--silent, -s', 'no output').parse(process.argv.slice(2));

var flags = design.flags;

var modPath = flags['--module'] || (0, _lodash.get)((0, _lodash.flattenDeep)(flags._), '0') || false;
var nodeBin = flags['--node'] || false;
var verbose = flags['--verbose'] || false;
var version = flags['--version'] || false;
var silent = flags['--silent'] || false;
var needsHelp = flags['--help'] || false;

if (verbose) {
  process.env['DEBUG'] = 'requireable-cli,requireable:*';
}

var requireable = require('@reggi/requireable').default;
var d = require('debug')('requireable-cli');

d({ modPath, nodeBin, verbose, version, silent, needsHelp });

if (needsHelp) {
  process.stdout.write(design.help() + '\n');
  process.exit(0);
} else if (version) {
  var pkg = require('./package.json');
  process.stdout.write(pkg.version + '\n');
  process.exit(0);
} else if (modPath) {
  _promise2.default.resolve().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var inherit, _ref2, success;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inherit = silent || true;
            _context.next = 3;
            return requireable({ modPath, nodeBin, inherit });

          case 3:
            _ref2 = _context.sent;
            success = _ref2.success;

            if (success) {
              _context.next = 7;
              break;
            }

            throw new Error('unsuccessful result use --verbose for more info');

          case 7:
            process.exit(0);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))).catch(function (e) {
    if (verbose) throw e;
    process.exit(1);
  });
} else {
  if (verbose) throw new Error('invalid arguments');
  if (!verbose && !silent) process.stderr.write('invalid arguments');
  process.exit(1);
}
