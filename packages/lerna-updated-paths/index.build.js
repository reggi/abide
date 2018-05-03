'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatedPaths = exports.packagePaths = exports.lernaUpdated = exports.lernaPaths = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _gitpkg = require('@reggi/gitpkg.traverse-up');

var _gitpkg2 = _interopRequireDefault(_gitpkg);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lernaPaths = exports.lernaPaths = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var workingDir = _ref.workingDir;
    var config, root, bin;
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
            config = _context.sent;
            root = _path2.default.dirname(config);
            bin = _path2.default.join(root, './node_modules/.bin/lerna');
            return _context.abrupt('return', { bin, config, root });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function lernaPaths(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var lernaUpdated = exports.lernaUpdated = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
    var lernaBinPath = _ref3.lernaBinPath;

    var _ref5, stdout, updatedParsed;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _execa2.default.shell(`${lernaBinPath} updated --json`, { cwd: __dirname });

          case 3:
            _ref5 = _context2.sent;
            stdout = _ref5.stdout;
            updatedParsed = JSON.parse(stdout);
            return _context2.abrupt('return', updatedParsed);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', []);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function lernaUpdated(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var packagePaths = exports.packagePaths = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref6) {
    var packagesDir = _ref6.packagesDir;
    var packages, paths;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _fsExtra2.default.readdir(packagesDir);

          case 2:
            packages = _context4.sent;
            _context4.next = 5;
            return _bluebird2.default.map(packages, function () {
              var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(pkg) {
                var packageDir, packageJsonPath, packageContent;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        packageDir = _path2.default.join(packagesDir, pkg);
                        packageJsonPath = _path2.default.join(packageDir, './package.json');
                        _context3.prev = 2;
                        _context3.next = 5;
                        return _fsExtra2.default.readJson(packageJsonPath);

                      case 5:
                        packageContent = _context3.sent;
                        return _context3.abrupt('return', { [packageContent.name]: packageDir });

                      case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](2);
                        return _context3.abrupt('return', false);

                      case 12:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined, [[2, 9]]);
              }));

              return function (_x4) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 5:
            paths = _context4.sent;
            return _context4.abrupt('return', _lodash.extend.apply(null, (0, _lodash.without)(paths, false)));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function packagePaths(_x3) {
    return _ref7.apply(this, arguments);
  };
}();

var updatedPaths = exports.updatedPaths = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref9) {
    var workingDir = _ref9.workingDir,
        _ref9$packagesDir = _ref9.packagesDir,
        packagesDir = _ref9$packagesDir === undefined ? './packages' : _ref9$packagesDir;

    var lerna, fullPackagesDir, _ref11, updated, paths, execPaths;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return lernaPaths({ workingDir });

          case 2:
            lerna = _context5.sent;
            fullPackagesDir = _path2.default.join(lerna.root, packagesDir);
            _context5.next = 6;
            return _bluebird2.default.props({
              updated: lernaUpdated({ lernaBinPath: lerna.bin }),
              paths: packagePaths({ packagesDir: fullPackagesDir })
            });

          case 6:
            _ref11 = _context5.sent;
            updated = _ref11.updated;
            paths = _ref11.paths;
            execPaths = (0, _lodash.without)((0, _lodash.map)(updated, function (updatedPackage) {
              return paths[updatedPackage.name] || false;
            }), false);
            return _context5.abrupt('return', execPaths);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function updatedPaths(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

// export const execUpdated = async ({workingDir, packagesDir, childCommand, stdio}) => {
//   const paths = await updatedPaths({workingDir, packagesDir})
//   return bluebird.map(paths, path => execa.shell(childCommand, {cwd: path, stdio}))
// }

// const childCommand = `json -f ./package.json -c "console.log(this.name)"`
// execUpdated({workingDir: process.cwd(), childCommand})
//   .then(console.log)
//   .catch(console.log)
