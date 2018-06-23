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

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _command2.default)(module, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd,
        exit = _ref.exit,
        stderr = _ref.stderr;

    var shellScript, workingDir, passArgv, cmd, _ref3, code;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shellScript = _path2.default.join(__dirname, 'index.sh');
            workingDir = cwd();
            passArgv = argv.slice(2).join(' ');
            cmd = `bash ${shellScript} ${passArgv}`;
            _context.prev = 4;
            _context.next = 7;
            return _execa2.default.shell(cmd, { cwd: workingDir, stdio: 'inherit' });

          case 7:
            _ref3 = _context.sent;
            code = _ref3.code;
            return _context.abrupt('return', exit(code));

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](4);

            stderr.write(_context.t0.message + '\n');
            return _context.abrupt('return', exit(1));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 12]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
