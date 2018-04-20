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
  return (0, _help2.default)().name('results').usage('[-- <args>...]').description('print clear exit code from command').option('-u, --color', 'use color', (0, _help.rename)('color', true)).option('-i, --inherit', 'inherit stdin', 'inherit').option('-C, --dir <path>', 'working directory to use', 'workingDir').option('-c, --command-show', 'prints command evaluted', 'showCommand').option('-p, --path-show', 'prints current working path', 'showPath').option('-d, --dir-show', 'prints current working directory', 'showDir').option('-e, --exit-show', 'shows the Exit code', 'showExit').option('-z, --zero', 'overwrites passed exit code with 0', 'zero').option('-v, --version', 'output the version number', 'version').option('-h, --help', 'show this output', 'help').parse(argv.slice(2));
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
  var status = void 0;
  if (code === 0) {
    status = green('success');
  } else if (code !== 0) {
    status = red('failure');
  }
  return status;
};

exports.default = (0, _command2.default)(module, function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var argv = _ref2.argv,
        stdout = _ref2.stdout,
        exit = _ref2.exit,
        cwd = _ref2.cwd;

    var design, pkg, cmd, workingDir, stdio, _ref4, code, exitCode, values;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            design = getDesign(argv);

            console.log(design);
            d('design fetched');

            if (!design.flags.help) {
              _context.next = 9;
              break;
            }

            d('help hit');
            stdout.write(design.help() + '\n');
            return _context.abrupt('return', exit(0));

          case 9:
            if (!design.flags.version) {
              _context.next = 16;
              break;
            }

            d('version hit');
            pkg = require('./package.json');

            stdout.write(pkg.version + '\n');
            return _context.abrupt('return', exit(0));

          case 16:
            if (!design.flags['--']) {
              _context.next = 35;
              break;
            }

            d('running main');
            cmd = design.flags['--'];
            workingDir = design.flags.workingDir || cwd();
            stdio = design.flags.inherit ? 'inherit' : 'pipe';
            _context.next = 23;
            return _execa2.default.shell(cmd, { cwd: workingDir, stdio });

          case 23:
            _ref4 = _context.sent;
            code = _ref4.code;
            exitCode = design.flags.zero ? 0 : code;
            values = [status({ code, color: design.flags.color })];

            if (design.flags.showCommand) values.push(`(executed ${cmd})`);
            if (design.flags.showPath) values.push(`(path ${cwd})`);
            if (design.flags.showDir) values.push(`(directory /${(0, _path.basename)(cwd)})`);
            if (design.flags.showExit) values.push(`(code ${code})`);
            stdout.write(values.join(' ') + '\n');
            process.exit(exitCode);
            _context.next = 38;
            break;

          case 35:
            d('else case');
            if (!design.flags.silent) stdout.write('invalid arguments');
            return _context.abrupt('return', exit(1));

          case 38:
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
