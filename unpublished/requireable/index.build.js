'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireable = exports.requireableCoreWrapped = exports.requireableCore = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
var isDir = function isDir(p) {
  return _fsExtra2.default.lstat(p).then(function (stat) {
    return stat.isDirectory();
  }).catch(function () {
    return false;
  });
};

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

var npmInstall = function npmInstall(_ref2) {
  var absoluteModPath = _ref2.absoluteModPath,
      tmpFullDir = _ref2.tmpFullDir;
  return (0, _execa2.default)('npm', ['install', absoluteModPath], { cwd: tmpFullDir, stdio: 'inherit' });
};
var requireModule = function requireModule(_ref3) {
  var _ref3$nodeBin = _ref3.nodeBin,
      nodeBin = _ref3$nodeBin === undefined ? 'node' : _ref3$nodeBin,
      modPkgJson = _ref3.modPkgJson,
      tmpFullDir = _ref3.tmpFullDir;
  return _execa2.default.shell(`${nodeBin} -e "require('${modPkgJson.name}');console.log('require successfull')"`, { cwd: tmpFullDir, stdio: 'inherit' });
};

var requireableCore = exports.requireableCore = (0, _journey.journey)(function (_ref4) {
  var modPath = _ref4.modPath,
      tmpFullDir = _ref4.tmpFullDir,
      nodeBin = _ref4.nodeBin,
      inherit = _ref4.inherit;
  return [function () {
    return { modPath, tmpFullDir };
  }, function (_ref5) {
    var inherit = _ref5.inherit;
    return { stdio: inherit ? 'inherit' : 'pipe' };
  },
  // checks if the modPath is a directory
  function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref6) {
      var modPath = _ref6.modPath;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', { modPathIsDir: isDir(modPath) });

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }(),
  // throws an error if it is invalid dir
  function (_ref8) {
    var modPathIsDir = _ref8.modPathIsDir;
    return !modPathIsDir ? (0, _pkg2.default)('module path is not a directory') : false;
  },
  // declares the path of the modPath's package.json file
  function (_ref9) {
    var modPath = _ref9.modPath;
    return { modPkgPath: _path2.default.join(modPath, 'package.json') };
  },
  // checks if the modPath has a package.json in it
  function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref10) {
      var modPkgPath = _ref10.modPkgPath;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', { modPkgPathIsFile: isFile(modPkgPath) });

            case 1:
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
  // throws an error if the expected modPath package.json is not valid
  function (_ref12) {
    var modPkgPathIsFile = _ref12.modPkgPathIsFile;
    return !modPkgPathIsFile ? (0, _pkg2.default)('module path missing package.json') : false;
  },
  // get the package.json
  function () {
    var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref13) {
      var modPkgPath = _ref13.modPkgPath;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _fsExtra2.default.readJson(modPkgPath);

            case 2:
              _context4.t0 = _context4.sent;
              return _context4.abrupt('return', {
                modPkgJson: _context4.t0
              });

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x4) {
      return _ref14.apply(this, arguments);
    };
  }(),
  // declares the path of the temp package.json file
  function (_ref15) {
    var tmpFullDir = _ref15.tmpFullDir;
    return { tmpFullDirPkg: _path2.default.join(tmpFullDir, 'package.json') };
  },
  // creates a the temp package.json file
  function () {
    var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref16) {
      var tmpFullDirPkg = _ref16.tmpFullDirPkg;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _fsExtra2.default.writeJson(tmpFullDirPkg, tmpPkgTemplate);

            case 2:
              _context5.t0 = _context5.sent;
              return _context5.abrupt('return', {
                resultWritePkg: _context5.t0
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
  }(),
  // creates an absolute path for the module (to install anywhere on machine)
  function (_ref18) {
    var modPath = _ref18.modPath;
    return { absoluteModPath: _path2.default.resolve(modPath) };
  },
  // attempts to install the module with the cwd set to the temp dir
  function () {
    var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref19) {
      var absoluteModPath = _ref19.absoluteModPath,
          tmpFullDir = _ref19.tmpFullDir,
          stdio = _ref19.stdio;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return npmInstall({ absoluteModPath, tmpFullDir, stdio });

            case 2:
              _context6.t0 = _context6.sent;
              return _context6.abrupt('return', {
                resultNpmInstall: _context6.t0
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
  }(),
  // attemps to require the install module and will throw error if fails
  function () {
    var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref21) {
      var modPkgJson = _ref21.modPkgJson,
          stdio = _ref21.stdio;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return requireModule({ nodeBin, modPkgJson, tmpFullDir, stdio });

            case 2:
              _context7.t0 = _context7.sent;
              return _context7.abrupt('return', {
                resultRequireMod: _context7.t0
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
  }(),
  // add success to object
  function () {
    return { success: true };
  }];
}, { hook: hook('requireableCore') });

var requireableCoreWrapped = exports.requireableCoreWrapped = function requireableCoreWrapped(_ref23) {
  var modPath = _ref23.modPath,
      tmpFullDir = _ref23.tmpFullDir;

  try {
    return requireableCore({ modPath, tmpFullDir });
  } catch (e) {
    return (0, _extends3.default)({ success: false }, e);
  }
};

var requireable = exports.requireable = (0, _journey.journey)(function (_ref24) {
  var modPath = _ref24.modPath,
      nodeBin = _ref24.nodeBin,
      inherit = _ref24.inherit;
  return [function () {
    return { modPath };
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
  function (_ref25) {
    var tmpDir = _ref25.tmpDir,
        uuid = _ref25.uuid;
    return { tmpFullDir: _path2.default.join(tmpDir, 'requireable-cli', uuid) };
  },
  // ensures dirpath exists (mkdirp)
  function () {
    var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref26) {
      var tmpFullDir = _ref26.tmpFullDir;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _fsExtra2.default.ensureDir(tmpFullDir);

            case 2:
              _context8.t0 = _context8.sent;
              return _context8.abrupt('return', {
                resultEnsureDir: _context8.t0
              });

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function (_x8) {
      return _ref27.apply(this, arguments);
    };
  }(),
  // runs core code (catches errors)
  function () {
    var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref28) {
      var modPath = _ref28.modPath,
          tmpFullDir = _ref28.tmpFullDir;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return requireableCoreWrapped({ modPath, tmpFullDir, nodeBin, inherit });

            case 2:
              _context9.t0 = _context9.sent;
              return _context9.abrupt('return', {
                core: _context9.t0
              });

            case 4:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function (_x9) {
      return _ref29.apply(this, arguments);
    };
  }(),
  // should run this even if there are errors
  function () {
    var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref30) {
      var tmpFullDir = _ref30.tmpFullDir;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _fsExtra2.default.remove(tmpFullDir);

            case 2:
              _context10.t0 = _context10.sent;
              return _context10.abrupt('return', {
                resultClean: _context10.t0
              });

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function (_x10) {
      return _ref31.apply(this, arguments);
    };
  }()
  // returns core
  ];
}, { return: 'core', hook: hook('requireable') });

exports.default = requireable;
