'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lernaDepAudit = exports.lernaRootBabelCompare = exports.lernaRootBabelComparePure = exports.lernaRootBabel = exports.lernaDepConsistency = exports.lernaDevDepConsistency = exports.FixError = exports.getIsFileSpecifier = exports.lernaDeps = exports.lernaPackageContents = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _lerna = require('@reggi/lerna.paths');

var _lerna2 = _interopRequireDefault(_lerna);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _semverSort = require('semver-sort');

var _semverSort2 = _interopRequireDefault(_semverSort);

var _babelMerge = require('babel-merge');

var _babelMerge2 = _interopRequireDefault(_babelMerge);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lernaPackageContents = exports.lernaPackageContents = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref) {
    var packagePaths = _ref.packagePaths;
    var paths;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bluebird2.default.map(packagePaths, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(packagePath) {
                var packageJsonPath, packageContent;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        packageJsonPath = _path2.default.join(packagePath, './package.json');
                        _context.prev = 1;
                        _context.next = 4;
                        return _fsExtra2.default.readJson(packageJsonPath);

                      case 4:
                        packageContent = _context.sent;
                        return _context.abrupt('return', { [packageJsonPath]: packageContent });

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', false);

                      case 11:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[1, 8]]);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 2:
            paths = _context2.sent;
            return _context2.abrupt('return', _lodash.extend.apply(null, (0, _lodash.without)(paths, false)));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function lernaPackageContents(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var lernaDeps = exports.lernaDeps = function lernaDeps(_ref4) {
  var packageContents = _ref4.packageContents;

  var devDependencies = {};
  var dependencies = {};
  (0, _lodash.each)(packageContents, function (packageContent) {
    if (packageContent.devDependencies) {
      (0, _lodash.each)(packageContent.devDependencies, function (version, devDependency) {
        if (!(0, _lodash.get)(devDependencies, `["${devDependency}"]`)) (0, _lodash.set)(devDependencies, `["${devDependency}"]`, {});
        if (!(0, _lodash.get)(devDependencies, `["${devDependency}"].["${version}"]`)) (0, _lodash.set)(devDependencies, `["${devDependency}"].["${version}"]`, []);
        devDependencies[devDependency][version].push(packageContent.name);
      });
    }
    if (packageContent.dependencies) {
      (0, _lodash.each)(packageContent.dependencies, function (version, devDependency) {
        if (!(0, _lodash.get)(dependencies, `["${devDependency}"]`)) (0, _lodash.set)(dependencies, `["${devDependency}"]`, {});
        if (!(0, _lodash.get)(dependencies, `["${devDependency}"].["${version}"]`)) (0, _lodash.set)(dependencies, `["${devDependency}"].["${version}"]`, []);
        dependencies[devDependency][version].push(packageContent.name);
      });
    }
  });
  return { dependencies, devDependencies };
};

var getIsFileSpecifier = exports.getIsFileSpecifier = function getIsFileSpecifier(v) {
  return typeof v === 'string' ? Boolean(v.match(/^file:/g)) : false;
};

var FixError = exports.FixError = function FixError(msg, fix) {
  var e = new Error(msg);
  e.fix = fix;
  return e;
};

var lernaDevDepConsistency = exports.lernaDevDepConsistency = function lernaDevDepConsistency(_ref5) {
  var devDependencies = _ref5.devDependencies,
      rootPackageContents = _ref5.rootPackageContents;

  var errors = [];
  (0, _lodash.each)(devDependencies, function (versions, devDep) {
    var versionsArr = (0, _keys2.default)(versions);
    var versionsString = _semverSort2.default.asc(versionsArr).join(', ');
    var rootDevDepVersion = (0, _lodash.get)(rootPackageContents.devDependencies, devDep);
    var rootDepVersion = (0, _lodash.get)(rootPackageContents.dependencies, devDep);
    var rootDevDepVersionIsFileSpecifier = getIsFileSpecifier(rootDevDepVersion);
    var rootDepVersionIsFileSpecifier = getIsFileSpecifier(rootDepVersion);
    var rootVersion = rootDevDepVersion || rootDepVersion;
    var isFileSpecifier = rootDevDepVersionIsFileSpecifier || rootDepVersionIsFileSpecifier;
    var isMissingRoot = !rootVersion && !isFileSpecifier;
    var isInvalidVersion = !isMissingRoot && !isFileSpecifier && !(0, _lodash.includes)(versionsArr, rootVersion);
    if ((0, _lodash.size)(versionsArr) !== 1) errors.push(new FixError(`packages using multiple versions of the devDep ${devDep} found ${versionsString}`, `here --changeDevDepVersion ${devDep} ${(0, _lodash.last)(versionsArr)}`));
    if (isMissingRoot) errors.push(new FixError(`root is missing devDep ${devDep}`, `npm install ${devDep} --save-dev`));
    if (isInvalidVersion) errors.push(new FixError(`root contains devDep ${devDep} at version ${rootVersion} needs ${versionsString}`, `npm install ${devDep}@${(0, _lodash.last)(versionsArr)} --save-dev`));
  });
  return errors;
};

var lernaDepConsistency = exports.lernaDepConsistency = function lernaDepConsistency(_ref6) {
  var dependencies = _ref6.dependencies;

  var errors = [];
  (0, _lodash.each)(dependencies, function (versions, devDep) {
    var versionsArr = (0, _keys2.default)(versions);
    var versionsString = versionsArr.join(', ');
    if ((0, _lodash.size)(versionsArr) !== 1) errors.push(new FixError(`packages using multiple versions of the dep ${devDep} found ${versionsString}`, `here --changeDepVersion ${devDep} ${(0, _lodash.last)(versionsArr)}`));
  });
  return errors;
};

var lernaRootBabel = exports.lernaRootBabel = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
    var workingDir = _ref7.workingDir;

    var _ref9, rootPath, packagePaths, packageContents, babelConfigs, babelConfig;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _lerna2.default)({ workingDir });

          case 2:
            _ref9 = _context3.sent;
            rootPath = _ref9.rootPath;
            packagePaths = _ref9.packagePaths;
            _context3.next = 7;
            return lernaPackageContents({ packagePaths });

          case 7:
            packageContents = _context3.sent;
            babelConfigs = (0, _lodash.map)(packageContents, function (pkg) {
              return pkg.babel;
            });
            babelConfig = (0, _lodash.reduce)(babelConfigs, function (acq, item) {
              return (0, _babelMerge2.default)(acq, item);
            });
            return _context3.abrupt('return', { babelConfig, rootPath });

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function lernaRootBabel(_x3) {
    return _ref8.apply(this, arguments);
  };
}();

var lernaRootBabelComparePure = exports.lernaRootBabelComparePure = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref10) {
    var rootPath = _ref10.rootPath,
        babelConfig = _ref10.babelConfig;
    var rootPathPackagePath, rootPathPackageContent;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            rootPathPackagePath = _path2.default.join(rootPath, 'package.json');
            _context4.next = 3;
            return _fsExtra2.default.readJson(rootPathPackagePath);

          case 3:
            rootPathPackageContent = _context4.sent;

            if (rootPathPackageContent.babel) {
              _context4.next = 6;
              break;
            }

            throw new Error('no babel config at package root');

          case 6:
            return _context4.abrupt('return', (0, _lodash.isEqual)(babelConfig, rootPathPackageContent.babel));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function lernaRootBabelComparePure(_x4) {
    return _ref11.apply(this, arguments);
  };
}();

var lernaRootBabelCompare = exports.lernaRootBabelCompare = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref12) {
    var workingDir = _ref12.workingDir;

    var _ref14, babelConfig, rootPath, compared;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return lernaRootBabel({ workingDir });

          case 2:
            _ref14 = _context5.sent;
            babelConfig = _ref14.babelConfig;
            rootPath = _ref14.rootPath;
            _context5.next = 7;
            return lernaRootBabelComparePure({ rootPath, babelConfig });

          case 7:
            compared = _context5.sent;
            return _context5.abrupt('return', compared);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function lernaRootBabelCompare(_x5) {
    return _ref13.apply(this, arguments);
  };
}();

var lernaDepAudit = exports.lernaDepAudit = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref15) {
    var workingDir = _ref15.workingDir;

    var _ref17, rootPackagePath, packagePaths, packageContents, _lernaDeps, dependencies, devDependencies, rootPackageContents, errors;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _lerna2.default)({ workingDir });

          case 2:
            _ref17 = _context6.sent;
            rootPackagePath = _ref17.rootPackagePath;
            packagePaths = _ref17.packagePaths;
            _context6.next = 7;
            return lernaPackageContents({ packagePaths });

          case 7:
            packageContents = _context6.sent;
            _lernaDeps = lernaDeps({ packageContents }), dependencies = _lernaDeps.dependencies, devDependencies = _lernaDeps.devDependencies;
            _context6.next = 11;
            return _fsExtra2.default.readJson(rootPackagePath);

          case 11:
            rootPackageContents = _context6.sent;
            errors = [];

            errors = errors.concat(lernaDevDepConsistency({ devDependencies, rootPackageContents }));
            errors = errors.concat(lernaDepConsistency({ dependencies }));
            return _context6.abrupt('return', errors);

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function lernaDepAudit(_x6) {
    return _ref16.apply(this, arguments);
  };
}();
