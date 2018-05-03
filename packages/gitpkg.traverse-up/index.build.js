'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverseUp = exports.pathType = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathType = exports.pathType = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
    var lstat;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fsExtra2.default.lstat(path);

          case 3:
            lstat = _context.sent;

            if (!lstat.isDirectory()) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', 'directory');

          case 6:
            if (!lstat.isFile()) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', 'file');

          case 8:
            return _context.abrupt('return', 'else');

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', false);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function pathType(_x) {
    return _ref.apply(this, arguments);
  };
}();

var traverseUp = exports.traverseUp = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref2) {
    var findPathPattern = _ref2.findPathPattern,
        findTypePattren = _ref2.findTypePattren,
        workingDir = _ref2.workingDir,
        cwd = _ref2.cwd;
    var thisDir, files, found, foundPath, type, nextDir;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(workingDir === '/')) {
              _context2.next = 2;
              break;
            }

            throw new Error('not found');

          case 2:
            thisDir = _path2.default.isAbsolute(workingDir) ? workingDir : _path2.default.join(cwd, workingDir);
            _context2.next = 5;
            return _fsExtra2.default.readdir(thisDir);

          case 5:
            files = _context2.sent;
            found = (0, _lodash.find)(files, function (file) {
              return file.match(findPathPattern);
            });

            if (!found) {
              _context2.next = 14;
              break;
            }

            foundPath = _path2.default.join(thisDir, found);
            _context2.next = 11;
            return pathType(foundPath);

          case 11:
            type = _context2.sent;

            if (!(type && type.match(findTypePattren))) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', foundPath);

          case 14:
            nextDir = _path2.default.join(thisDir, '..');
            return _context2.abrupt('return', traverseUp({ findPathPattern, findTypePattren, workingDir: nextDir, cwd }));

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function traverseUp(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = traverseUp;
