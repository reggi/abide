#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unMerge = exports.depMerge = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _journey = require('@reggi/journey');

var _journey2 = _interopRequireDefault(_journey);

var _pkg = require('@reggi/pkg.file-exists');

var _pkg2 = _interopRequireDefault(_pkg);

var _hasFlag = require('has-flag');

var _hasFlag2 = _interopRequireDefault(_hasFlag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCK = 'temporary-file:deletion-prevention';
var PACKAGE_JSON = 'package.json';
var endsInPackageJson = function endsInPackageJson(path) {
  return path.match(new RegExp(`${PACKAGE_JSON}$`));
};
var condition = function condition(truthy, newJourney) {
  return truthy ? (0, _journey2.default)(function () {
    return newJourney;
  })() : false;
};
var mergeDeps = function mergeDeps(packageContent) {
  return (0, _extends3.default)({
    [BLOCK]: BLOCK
  }, packageContent, {
    dependencies: (0, _extends3.default)({}, packageContent.dependencies, packageContent.devDependencies)
  });
};

var depMerge = exports.depMerge = (0, _journey2.default)(function (dirPath) {
  return [function () {
    return { dirPath };
  }, function (_ref) {
    var dirPath = _ref.dirPath;
    return { endsInPackageJson: endsInPackageJson(dirPath) };
  }, function (_ref2) {
    var dirPath = _ref2.dirPath,
        endsInPackageJson = _ref2.endsInPackageJson;
    return endsInPackageJson ? { pkgPath: dirPath } : { pkgPath: _path2.default.join(dirPath, PACKAGE_JSON) };
  }, function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
      var pkgPath = _ref3.pkgPath;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _pkg2.default)(pkgPath);

            case 2:
              _context.t0 = _context.sent;
              return _context.abrupt('return', {
                fileExists: _context.t0
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }(), function (_ref5) {
    var fileExists = _ref5.fileExists,
        pkgPath = _ref5.pkgPath;
    return condition(fileExists, [function () {
      return { pkgPath };
    },
    // create new package.json
    function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref6) {
        var pkgPath = _ref6.pkgPath;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _fsExtra2.default.readJson(pkgPath);

              case 2:
                _context2.t0 = _context2.sent;
                return _context2.abrupt('return', {
                  packageContent: _context2.t0
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x2) {
        return _ref7.apply(this, arguments);
      };
    }(), function (_ref8) {
      var packageContent = _ref8.packageContent;
      return { newPackageJson: mergeDeps(packageContent) };
    },
    // move the original package.json
    function (_ref9) {
      var pkgPath = _ref9.pkgPath;
      return { mvPath: _path2.default.join(_path2.default.dirname(pkgPath), 'original_package.json') };
    }, function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref10) {
        var pkgPath = _ref10.pkgPath,
            mvPath = _ref10.mvPath;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _fsExtra2.default.move(pkgPath, mvPath);

              case 2:
                _context3.t0 = _context3.sent;
                return _context3.abrupt('return', {
                  moveOg: _context3.t0
                });

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x3) {
        return _ref11.apply(this, arguments);
      };
    }(),
    // // write the new package.json
    function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref12) {
        var pkgPath = _ref12.pkgPath,
            newPackageJson = _ref12.newPackageJson;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _fsExtra2.default.writeFile(pkgPath, (0, _stringify2.default)(newPackageJson, null, 2));

              case 2:
                _context4.t0 = _context4.sent;
                return _context4.abrupt('return', {
                  outputJson: _context4.t0
                });

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x4) {
        return _ref13.apply(this, arguments);
      };
    }()]);
  }];
}, { hook: function hook(acq, res) {
    return console.log(res);
  } });

var unMerge = exports.unMerge = (0, _journey2.default)(function (dirPath) {
  return [function () {
    return { dirPath };
  }, function (_ref14) {
    var dirPath = _ref14.dirPath;
    return { endsInPackageJson: endsInPackageJson(dirPath) };
  }, function (_ref15) {
    var dirPath = _ref15.dirPath,
        endsInPackageJson = _ref15.endsInPackageJson;
    return endsInPackageJson ? { pkgPath: dirPath } : { pkgPath: _path2.default.join(dirPath, PACKAGE_JSON) };
  }, function () {
    var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref16) {
      var pkgPath = _ref16.pkgPath;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _pkg2.default)(pkgPath);

            case 2:
              _context5.t0 = _context5.sent;
              return _context5.abrupt('return', {
                newExists: _context5.t0
              });

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x5) {
      return _ref17.apply(this, arguments);
    };
  }(), function (_ref18) {
    var pkgPath = _ref18.pkgPath;
    return { mvPath: _path2.default.join(_path2.default.dirname(pkgPath), 'original_package.json') };
  }, function () {
    var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref19) {
      var mvPath = _ref19.mvPath;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _pkg2.default)(mvPath);

            case 2:
              _context6.t0 = _context6.sent;
              return _context6.abrupt('return', {
                originalExists: _context6.t0
              });

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x6) {
      return _ref20.apply(this, arguments);
    };
  }(), function () {
    var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref21) {
      var pkgPath = _ref21.pkgPath;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _fsExtra2.default.readJson(pkgPath);

            case 2:
              _context7.t0 = _context7.sent;
              return _context7.abrupt('return', {
                packageJsonContent: _context7.t0
              });

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function (_x7) {
      return _ref22.apply(this, arguments);
    };
  }(), function (_ref23) {
    var packageJsonContent = _ref23.packageJsonContent;
    return { worthy: packageJsonContent[BLOCK] && packageJsonContent[BLOCK] === BLOCK };
  }, function (_ref24) {
    var newExists = _ref24.newExists,
        originalExists = _ref24.originalExists,
        worthy = _ref24.worthy,
        pkgPath = _ref24.pkgPath,
        mvPath = _ref24.mvPath;
    return condition(worthy && newExists && originalExists, [function () {
      return { pkgPath, mvPath };
    }, function () {
      var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref25) {
        var pkgPath = _ref25.pkgPath;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _fsExtra2.default.remove(pkgPath);

              case 2:
                _context8.t0 = _context8.sent;
                return _context8.abrupt('return', {
                  remove: _context8.t0
                });

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      return function (_x8) {
        return _ref26.apply(this, arguments);
      };
    }(), function () {
      var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref27) {
        var pkgPath = _ref27.pkgPath,
            mvPath = _ref27.mvPath;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _fsExtra2.default.move(mvPath, pkgPath);

              case 2:
                _context9.t0 = _context9.sent;
                return _context9.abrupt('return', {
                  moveOg: _context9.t0
                });

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      return function (_x9) {
        return _ref28.apply(this, arguments);
      };
    }()]);
  }];
}, { hook: function hook(acq, res) {
    return console.log(res);
  } });

if ((0, _hasFlag2.default)('--unmerge')) {
  unMerge(process.argv.slice(2)[0]);
} else {
  depMerge(process.argv.slice(2)[0]);
}
