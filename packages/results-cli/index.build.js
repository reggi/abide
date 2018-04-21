#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _path = require('path');

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('results-cli');

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('results').usage('[-- <args>...]').description('print clear exit code from command').option('-u, --no-color', 'hide color').option('-i, --inherit', 'inherit stdin', 'inherit').option('-C, --dir <path>', 'working directory to use', 'workingDir').option('-c, --command-show', 'prints command evaluted', 'showCommand').option('-p, --path-show', 'prints current working path', 'showPath').option('-d, --dir-show', 'prints current working directory', 'showDir').option('-e, --exit-show', 'shows the Exit code', 'showExit').option('-z, --zero', 'overwrites passed exit code with 0', 'zero').option('-v, --version', 'output the version number', 'version').option('-s, --silent', 'hide output from this command', 'silent').option('-h, --help', 'show this output', 'help').parse(argv.slice(2));
};

var status = function status(_ref) {
  var code = _ref.code,
      color = _ref.color;

  var green = function green(message) {
    return color ? _safe2.default.green(message) : message;
  };
  var red = function red(message) {
    return color ? _safe2.default.red(message) : message;
  };
  if (code === 0) return green('success');
  return red('failure');
};

var response = function response(_ref2) {
  var design = _ref2.design,
      color = _ref2.color,
      code = _ref2.code,
      cmd = _ref2.cmd,
      cwd = _ref2.cwd;

  var values = [status({ code, color })];
  if (design.flags.showCommand) values.push(`(executed ${cmd})`);
  if (design.flags.showPath) values.push(`(path ${cwd})`);
  if (design.flags.showDir) values.push(`(directory /${(0, _path.basename)(cwd)})`);
  if (design.flags.showExit) values.push(`(code ${code})`);
  return values.join(' ');
};

var getCode = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
    var cmd = _ref3.cmd,
        workingDir = _ref3.workingDir,
        stdio = _ref3.stdio;
    var commandResponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _execa2.default.shell(cmd, { cwd: workingDir, stdio });

          case 3:
            commandResponse = _context.sent;
            return _context.abrupt('return', commandResponse.code);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0.code);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getCode(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var getColor = function getColor(design) {
  if (design.flags['-u']) return false;
  if (design.flags['--color']) return design.flags['--color'];
  return true;
};

exports.default = (0, _command2.default)(module, function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
    var argv = _ref5.argv,
        stdout = _ref5.stdout,
        exit = _ref5.exit,
        cwd = _ref5.cwd;
    var design, pkg, cmd, workingDir, stdio, code, color, exitCode;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            design = getDesign(argv);

            d('design fetched');

            if (!design.flags.help) {
              _context2.next = 8;
              break;
            }

            d('help hit');
            stdout.write(design.help() + '\n');
            return _context2.abrupt('return', exit(0));

          case 8:
            if (!design.flags.version) {
              _context2.next = 15;
              break;
            }

            d('version hit');
            pkg = require('./package.json');

            stdout.write(pkg.version + '\n');
            return _context2.abrupt('return', exit(0));

          case 15:
            if (!design.flags['--']) {
              _context2.next = 29;
              break;
            }

            d('running main');
            cmd = design.flags['--'];
            workingDir = design.flags.workingDir || cwd();
            stdio = design.flags.inherit ? 'inherit' : 'pipe';
            _context2.next = 22;
            return getCode({ cmd, workingDir, stdio });

          case 22:
            code = _context2.sent;
            color = getColor(design);
            exitCode = design.flags.zero ? 0 : code;

            stdout.write(response({ design, color, code, cmd, cwd: workingDir }) + '\n');
            return _context2.abrupt('return', exit(exitCode));

          case 29:
            d('else case');
            if (!design.flags.silent) stdout.write('invalid arguments');
            return _context2.abrupt('return', exit(1));

          case 32:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref6.apply(this, arguments);
  };
}());
