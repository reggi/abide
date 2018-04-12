#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runScript = exports.findScript = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _lodash = require('lodash');

var _journey = require('@reggi/journey');

var _journey2 = _interopRequireDefault(_journey);

var _pkg = require('@reggi/pkg.read-json');

var _pkg2 = _interopRequireDefault(_pkg);

var _pkg3 = require('@reggi/pkg.throw-error');

var _pkg4 = _interopRequireDefault(_pkg3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findScript = exports.findScript = (0, _journey2.default)(function (script, workingDir) {
  return [function () {
    return { script, workingDir };
  }, function (_ref) {
    var workingDir = _ref.workingDir;
    return workingDir === '/' ? (0, _pkg4.default)('no script found') : {};
  }, function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
      var workingDir = _ref2.workingDir;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _pkg2.default)({ workingDir, fileName: 'package.json' });

            case 2:
              _context.t0 = _context.sent;
              return _context.abrupt('return', {
                readJson: _context.t0
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), function (_ref4) {
    var script = _ref4.script,
        readJson = _ref4.readJson;
    return { scriptFound: (0, _lodash.get)(readJson, `scripts.${script}`) };
  }, function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
      var scriptFound = _ref5.scriptFound;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (scriptFound) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return findScript(script, _path2.default.dirname(workingDir));

            case 3:
              _context2.t1 = _context2.sent;
              _context2.t0 = {
                scriptDir: _context2.t1
              };
              _context2.next = 8;
              break;

            case 7:
              _context2.t0 = { scriptDir: workingDir };

            case 8:
              return _context2.abrupt('return', _context2.t0);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref6.apply(this, arguments);
    };
  }()];
}, { return: 'scriptDir' });

var runScript = exports.runScript = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var script, cwd, scriptDir;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            script = process.argv.slice(2)[0];
            cwd = process.cwd();
            _context3.next = 4;
            return findScript(script, cwd);

          case 4:
            scriptDir = _context3.sent;
            return _context3.abrupt('return', (0, _child_process.spawnSync)('sh', ['-c', `npm run --prefix ${scriptDir} ${script}`], { stdio: 'inherit' }));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function runScript() {
    return _ref7.apply(this, arguments);
  };
}();

runScript().then();
