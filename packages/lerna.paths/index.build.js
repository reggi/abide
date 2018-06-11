'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lernaPaths = exports.lernaCorePaths = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _gitpkg = require('@reggi/gitpkg.traverse-up');

var _gitpkg2 = _interopRequireDefault(_gitpkg);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globAsync = _bluebird2.default.promisify(_glob2.default);

var lernaCorePaths = exports.lernaCorePaths = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var workingDir = _ref.workingDir;
    var configPath, rootPath, rootPackagePath, binPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _gitpkg2.default)({
              findPathPattern: 'lerna.json',
              findTypePattren: 'file',
              workingDir
            });

          case 2:
            configPath = _context.sent;
            rootPath = _path2.default.dirname(configPath);
            rootPackagePath = _path2.default.join(rootPath, './package.json');
            binPath = _path2.default.join(rootPath, './node_modules/.bin/lerna');
            return _context.abrupt('return', { configPath, rootPath, rootPackagePath, binPath });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function lernaCorePaths(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var lernaPaths = exports.lernaPaths = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
    var workingDir = _ref3.workingDir;

    var _ref5, configPath, rootPath, rootPackagePath, binPath, config, packagePaths, flatPackagePaths;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return lernaCorePaths({ workingDir });

          case 2:
            _ref5 = _context2.sent;
            configPath = _ref5.configPath;
            rootPath = _ref5.rootPath;
            rootPackagePath = _ref5.rootPackagePath;
            binPath = _ref5.binPath;
            _context2.next = 9;
            return _fsExtra2.default.readJson(configPath);

          case 9:
            config = _context2.sent;
            _context2.next = 12;
            return _bluebird2.default.map(config.packages, function (pkg) {
              return globAsync(pkg, { cwd: rootPath, realpath: true });
            });

          case 12:
            packagePaths = _context2.sent;
            flatPackagePaths = (0, _lodash.flatten)(packagePaths);
            return _context2.abrupt('return', { configPath, rootPath, rootPackagePath, binPath, config, packagePaths: flatPackagePaths });

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function lernaPaths(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.default = lernaPaths;
