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

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _pkgprop = require('@reggi/pkgprop');

var _pkgprop2 = _interopRequireDefault(_pkgprop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('pkgprop').usage('').description('interactive way to update properties in package.json').option('--prop <string>', 'property to update', 'prop').option('-C, --dir <path>', 'working directory', 'workingDir').option('--pkgpath <path>', 'the path to the sub repo', 'packagePath').option('-h, --help', 'show this output', 'help').option('--version, -v', 'show version number', 'version').parse(argv.slice(2));
};

var getDir = function getDir(_ref) {
  var workingDir = _ref.workingDir,
      cwd = _ref.cwd;

  var _cwd = cwd();
  if (workingDir && _path2.default.isAbsolute(workingDir)) return workingDir;
  if (workingDir) return _path2.default.join(_cwd, workingDir);
  return _cwd;
};

var main = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var argv = _ref2.argv,
        cwd = _ref2.cwd;

    var design, workingDir, _design$flags, help, version, prop, packagePath;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);
            workingDir = getDir({ workingDir: design.flags.workingDir, cwd });
            _design$flags = design.flags, help = _design$flags.help, version = _design$flags.version, prop = _design$flags.prop, packagePath = _design$flags.packagePath;

            if (!help) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', design.help());

          case 7:
            if (!version) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', require('./package.json').version);

          case 11:
            if (!prop) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return (0, _pkgprop2.default)({ workingDir, prop, packagePath });

          case 14:
            return _context.abrupt('return', false);

          case 17:
            throw new Error('invalid arguments');

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function main(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = (0, _command2.default)(module, function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var argv = _ref4.argv,
        stdout = _ref4.stdout,
        cwd = _ref4.cwd,
        exit = _ref4.exit;
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
            exit(1);
            throw _context2.t0;

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  }));

  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}());
