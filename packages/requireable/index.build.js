'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireable = exports.requireableCoreWrapped = exports.requireableCore = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _journey = require('@reggi/journey');

var _pkg = require('@reggi/pkg.throw-error');

var _pkg2 = _interopRequireDefault(_pkg);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hook = function hook(journeyName) {
  return function (acq, res) {
    return (0, _debug2.default)(`requireable:${journeyName}`)((0, _stringify2.default)(res));
  };
};
var isFile = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(p) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _fsExtra2.default.lstat(p).then(function (stat) {
              return stat.isFile();
            }).catch(function () {
              return false;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function isFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
var isDir = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(p) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _fsExtra2.default.lstat(p).then(function (stat) {
              return stat.isDirectory();
            }).catch(function () {
              return false;
            }));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function isDir(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var tmpPkgTemplate = {
  'name': 'requireable-temp',
  'version': '1.0.0',
  'description': 'This is a temporary package.json to test',
  'repository': 'https://github.com/nodejs/node',
  'main': 'index.js',
  'scripts': {
    'test': 'echo \'Error: no test specified\' && exit 1'
  },
  'keywords': [],
  'author': '',
  'license': 'ISC'
};

var npmInstall = function npmInstall(_ref3) {
  var absoluteModPath = _ref3.absoluteModPath,
      tmpFullDir = _ref3.tmpFullDir,
      stdio = _ref3.stdio;
  return (0, _execa2.default)('npm', ['install', absoluteModPath], { cwd: tmpFullDir, stdio });
};
var requireModule = function requireModule(_ref4) {
  var _ref4$nodeBin = _ref4.nodeBin,
      nodeBin = _ref4$nodeBin === undefined ? 'node' : _ref4$nodeBin,
      modPkgJson = _ref4.modPkgJson,
      tmpFullDir = _ref4.tmpFullDir,
      stdio = _ref4.stdio;
  return _execa2.default.shell(`${nodeBin} -e "require('${modPkgJson.name}');console.log('require successfull')"`, { cwd: tmpFullDir, stdio });
};

var requireableCore = exports.requireableCore = (0, _journey.journey)(function (_ref5) {
  var modPath = _ref5.modPath,
      nodeBin = _ref5.nodeBin,
      inherit = _ref5.inherit,
      tmpFullDir = _ref5.tmpFullDir;
  return [function () {
    return { modPath, nodeBin, inherit, tmpFullDir };
  }, function (_ref6) {
    var inherit = _ref6.inherit;
    return { stdio: inherit ? 'inherit' : 'pipe' };
  },
  // checks if the modPath is a directory
  function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
      var modPath = _ref7.modPath;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return isDir(modPath);

            case 2:
              _context3.t0 = _context3.sent;
              return _context3.abrupt('return', {
                modPathIsDir: _context3.t0
              });

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x3) {
      return _ref8.apply(this, arguments);
    };
  }(),
  // throws an error if it is invalid dir
  function (_ref9) {
    var modPathIsDir = _ref9.modPathIsDir;
    return !modPathIsDir ? (0, _pkg2.default)('module path is not a directory') : { modPathIsDirError: 'pass' };
  },
  // declares the path of the modPath's package.json file
  function (_ref10) {
    var modPath = _ref10.modPath;
    return { modPkgPath: _path2.default.join(modPath, 'package.json') };
  },
  // checks if the modPath has a package.json in it
  function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref11) {
      var modPkgPath = _ref11.modPkgPath;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return isFile(modPkgPath);

            case 2:
              _context4.t0 = _context4.sent;
              return _context4.abrupt('return', {
                modPkgPathIsFile: _context4.t0
              });

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x4) {
      return _ref12.apply(this, arguments);
    };
  }(),
  // throws an error if the expected modPath package.json is not valid
  function (_ref13) {
    var modPkgPathIsFile = _ref13.modPkgPathIsFile;
    return !modPkgPathIsFile ? (0, _pkg2.default)('module path missing package.json') : { modPkgPathIsFileError: 'pass' };
  },
  // get the package.json
  function () {
    var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref14) {
      var modPkgPath = _ref14.modPkgPath;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _fsExtra2.default.readJson(modPkgPath);

            case 2:
              _context5.t0 = _context5.sent;
              return _context5.abrupt('return', {
                modPkgJson: _context5.t0
              });

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x5) {
      return _ref15.apply(this, arguments);
    };
  }(),
  // declares the path of the temp package.json file
  function (_ref16) {
    var tmpFullDir = _ref16.tmpFullDir;
    return { tmpFullDirPkg: _path2.default.join(tmpFullDir, 'package.json') };
  },
  // creates a the temp package.json file
  function () {
    var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref17) {
      var tmpFullDirPkg = _ref17.tmpFullDirPkg;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _fsExtra2.default.writeJson(tmpFullDirPkg, tmpPkgTemplate);

            case 2:
              _context6.t0 = _context6.sent;
              return _context6.abrupt('return', {
                resultWritePkg: _context6.t0
              });

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x6) {
      return _ref18.apply(this, arguments);
    };
  }(),
  // creates an absolute path for the module (to install anywhere on machine)
  function (_ref19) {
    var modPath = _ref19.modPath;
    return { absoluteModPath: _path2.default.resolve(modPath) };
  },
  // attempts to install the module with the cwd set to the temp dir
  function () {
    var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref20) {
      var absoluteModPath = _ref20.absoluteModPath,
          tmpFullDir = _ref20.tmpFullDir,
          stdio = _ref20.stdio;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return npmInstall({ absoluteModPath, tmpFullDir, stdio });

            case 2:
              _context7.t0 = _context7.sent;
              return _context7.abrupt('return', {
                resultNpmInstall: _context7.t0
              });

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function (_x7) {
      return _ref21.apply(this, arguments);
    };
  }(),
  // attemps to require the install module and will throw error if fails
  function () {
    var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref22) {
      var nodeBin = _ref22.nodeBin,
          modPkgJson = _ref22.modPkgJson,
          stdio = _ref22.stdio;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return requireModule({ nodeBin, modPkgJson, tmpFullDir, stdio });

            case 2:
              _context8.t0 = _context8.sent;
              return _context8.abrupt('return', {
                resultRequireMod: _context8.t0
              });

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function (_x8) {
      return _ref23.apply(this, arguments);
    };
  }(),
  // add success to object
  function () {
    return { success: true };
  }];
}, { hook: hook('requireableCore') });

var requireableCoreWrapped = exports.requireableCoreWrapped = function () {
  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref24) {
    var modPath = _ref24.modPath,
        tmpFullDir = _ref24.tmpFullDir,
        inherit = _ref24.inherit;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return requireableCore({ modPath, tmpFullDir, inherit });

          case 3:
            return _context9.abrupt('return', _context9.sent);

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9['catch'](0);
            return _context9.abrupt('return', { success: false, error: _context9.t0 });

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[0, 6]]);
  }));

  return function requireableCoreWrapped(_x9) {
    return _ref25.apply(this, arguments);
  };
}();

var requireable = exports.requireable = (0, _journey.journey)(function (_ref26) {
  var modPath = _ref26.modPath,
      nodeBin = _ref26.nodeBin,
      inherit = _ref26.inherit;
  return [function () {
    return { modPath, nodeBin, inherit };
  },
  // gets the temp dir
  function () {
    return { tmpDir: _os2.default.tmpdir() };
  },
  // generates uuid
  function () {
    return { uuid: (0, _uuid2.default)() };
  },
  // full expected dir path
  function (_ref27) {
    var tmpDir = _ref27.tmpDir,
        uuid = _ref27.uuid;
    return { tmpFullDir: _path2.default.join(tmpDir, 'requireable-cli', uuid) };
  },
  // ensures dirpath exists (mkdirp)
  function () {
    var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref28) {
      var tmpFullDir = _ref28.tmpFullDir;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _fsExtra2.default.ensureDir(tmpFullDir);

            case 2:
              _context10.t0 = _context10.sent;
              return _context10.abrupt('return', {
                resultEnsureDir: _context10.t0
              });

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function (_x10) {
      return _ref29.apply(this, arguments);
    };
  }(),
  // runs core code (catches errors)
  function () {
    var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(_ref30) {
      var modPath = _ref30.modPath,
          nodeBin = _ref30.nodeBin,
          inherit = _ref30.inherit,
          tmpFullDir = _ref30.tmpFullDir;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return requireableCoreWrapped({ modPath, nodeBin, inherit, tmpFullDir });

            case 2:
              _context11.t0 = _context11.sent;
              return _context11.abrupt('return', {
                core: _context11.t0
              });

            case 4:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function (_x11) {
      return _ref31.apply(this, arguments);
    };
  }(),
  // should run this even if there are errors
  function () {
    var _ref33 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(_ref32) {
      var tmpFullDir = _ref32.tmpFullDir;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _fsExtra2.default.remove(tmpFullDir);

            case 2:
              _context12.t0 = _context12.sent;
              return _context12.abrupt('return', {
                resultClean: _context12.t0
              });

            case 4:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function (_x12) {
      return _ref33.apply(this, arguments);
    };
  }(),
  // should throw error if core has one
  function (_ref34) {
    var core = _ref34.core;

    if (!core.success) throw core.error;
    return { coreError: false };
  }
  // returns core
  ];
}, { return: 'core', hook: hook('requireable') });

exports.default = requireable;
