'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depPointer = exports.packageHandler = exports.createPackageLocal = exports.packageJsonInWorkingDir = exports.lernaPackages = exports.lernaConfig = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _pMap = require('p-map');

var _pMap2 = _interopRequireDefault(_pMap);

var _gitpkg = require('@reggi/gitpkg.traverse-up');

var _gitpkg2 = _interopRequireDefault(_gitpkg);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _project = require('@lerna/project');

var _project2 = _interopRequireDefault(_project);

var _collectPackages = require('@lerna/collect-packages');

var _collectPackages2 = _interopRequireDefault(_collectPackages);

var _packageGraph = require('@lerna/package-graph');

var _packageGraph2 = _interopRequireDefault(_packageGraph);

var _collectUpdates = require('@lerna/collect-updates');

var _collectUpdates2 = _interopRequireDefault(_collectUpdates);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lernaConfig = exports.lernaConfig = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var workingDir = _ref.workingDir;
    var traverseUpDefaults, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            traverseUpDefaults = { findPathPattern: 'lerna.json', findTypePattren: 'file' };
            _context.next = 3;
            return (0, _gitpkg2.default)((0, _extends3.default)({}, traverseUpDefaults, { workingDir }));

          case 3:
            config = _context.sent;
            return _context.abrupt('return', config);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function lernaConfig(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var lernaPackages = exports.lernaPackages = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
    var config = _ref3.config,
        forcePublish = _ref3.forcePublish;
    var lerna, rootPath, packageConfigs, packages, packageGraph, logger, execOpts, options, updates;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            lerna = new _project2.default(config);
            rootPath = lerna.rootPath, packageConfigs = lerna.packageConfigs;
            _context2.next = 4;
            return (0, _collectPackages2.default)(rootPath, packageConfigs);

          case 4:
            packages = _context2.sent;
            packageGraph = new _packageGraph2.default(packages);
            logger = _npmlog2.default.newGroup('depPointer');
            execOpts = { cwd: rootPath };
            options = forcePublish ? { 'forcePublish': '*' } : {};
            updates = (0, _collectUpdates2.default)({
              filteredPackages: packages,
              packageGraph,
              rootPath,
              options,
              logger,
              execOpts
            });
            return _context2.abrupt('return', { updates, packageGraph });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function lernaPackages(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var packageJsonInWorkingDir = exports.packageJsonInWorkingDir = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5) {
    var workingDir = _ref5.workingDir;
    var packagePath, packageContent, packageName;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            packagePath = _path2.default.join(workingDir, 'package.json');
            _context3.prev = 1;
            _context3.next = 4;
            return _fsExtra2.default.readJson(packagePath);

          case 4:
            packageContent = _context3.sent;
            packageName = packageContent.name;
            return _context3.abrupt('return', packageName);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](1);
            return _context3.abrupt('return', false);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 9]]);
  }));

  return function packageJsonInWorkingDir(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

// changes the version / file and saves the file
var updateLocalDependency = function updateLocalDependency(_ref7) {
  var packageGraph = _ref7.packageGraph,
      savePrefix = _ref7.savePrefix,
      fullPkg = _ref7.fullPkg;
  var pkg = fullPkg.pkg,
      localDependencies = fullPkg.localDependencies;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(localDependencies), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref8 = _step.value;

      var _ref9 = (0, _slicedToArray3.default)(_ref8, 2);

      var depName = _ref9[0];
      var resolved = _ref9[1];

      var depVersion = packageGraph.get(depName).pkg.version;
      pkg.updateLocalDependency(resolved, depVersion, savePrefix);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return pkg.serialize();
};

var createPackageLocal = exports.createPackageLocal = function createPackageLocal(_ref10) {
  var pkg = _ref10.pkg;

  return _fsExtra2.default.writeJson(_path2.default.join(pkg.location, 'package-local.json'), pkg.toJSON(), { spaces: 2 });
};

var packageHandler = exports.packageHandler = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref11, callback) {
    var updates = _ref11.updates,
        packageName = _ref11.packageName;
    var fullPkg;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!packageName) {
              _context5.next = 6;
              break;
            }

            fullPkg = (0, _lodash.find)(updates, function (_ref13) {
              var pkg = _ref13.pkg;
              return pkg.name === packageName;
            });
            _context5.next = 4;
            return callback(fullPkg);

          case 4:
            _context5.next = 8;
            break;

          case 6:
            _context5.next = 8;
            return (0, _pMap2.default)(updates, function () {
              var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(fullPkg) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return callback(fullPkg);

                      case 2:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x6) {
                return _ref14.apply(this, arguments);
              };
            }());

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function packageHandler(_x4, _x5) {
    return _ref12.apply(this, arguments);
  };
}();

var depPointer = exports.depPointer = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref15) {
    var workingDir = _ref15.workingDir,
        _ref15$savePrefix = _ref15.savePrefix,
        savePrefix = _ref15$savePrefix === undefined ? '' : _ref15$savePrefix,
        all = _ref15.all,
        changed = _ref15.changed,
        packageName = _ref15.packageName,
        _ref15$backupLocal = _ref15.backupLocal,
        backupLocal = _ref15$backupLocal === undefined ? true : _ref15$backupLocal,
        _ref15$useLocal = _ref15.useLocal,
        useLocal = _ref15$useLocal === undefined ? false : _ref15$useLocal;

    var config, _ref17, updates, packageGraph;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(!all && !changed && !packageName)) {
              _context8.next = 4;
              break;
            }

            _context8.next = 3;
            return packageJsonInWorkingDir({ workingDir });

          case 3:
            packageName = _context8.sent;

          case 4:
            if (!(!all && !changed && !packageName)) {
              _context8.next = 6;
              break;
            }

            throw new Error('nothing specific to change');

          case 6:
            _context8.next = 8;
            return lernaConfig({ workingDir });

          case 8:
            config = _context8.sent;
            _context8.next = 11;
            return lernaPackages({ config, forcePublish: all || packageName });

          case 11:
            _ref17 = _context8.sent;
            updates = _ref17.updates;
            packageGraph = _ref17.packageGraph;

            if (!useLocal) {
              _context8.next = 19;
              break;
            }

            _context8.next = 17;
            return packageHandler({ updates, packageName }, function () {
              var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref18) {
                var pkg = _ref18.pkg;
                var packageLocalPath, pkgLocal;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        packageLocalPath = _path2.default.join(pkg.location, 'package-local.json');
                        _context6.next = 3;
                        return _fsExtra2.default.readJson(packageLocalPath);

                      case 3:
                        pkgLocal = _context6.sent;
                        _context6.next = 6;
                        return _fsExtra2.default.writeJson(_path2.default.join(pkg.location, 'package.json'), pkgLocal, { spaces: 2 });

                      case 6:
                        _context6.next = 8;
                        return _fsExtra2.default.remove(packageLocalPath);

                      case 8:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x8) {
                return _ref19.apply(this, arguments);
              };
            }());

          case 17:
            _context8.next = 21;
            break;

          case 19:
            _context8.next = 21;
            return packageHandler({ updates, packageName }, function () {
              var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(fullPkg) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!backupLocal) {
                          _context7.next = 3;
                          break;
                        }

                        _context7.next = 3;
                        return createPackageLocal(fullPkg);

                      case 3:
                        _context7.next = 5;
                        return updateLocalDependency({ packageGraph, savePrefix, fullPkg });

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x9) {
                return _ref20.apply(this, arguments);
              };
            }());

          case 21:
            return _context8.abrupt('return', true);

          case 22:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function depPointer(_x7) {
    return _ref16.apply(this, arguments);
  };
}();

exports.default = depPointer;
