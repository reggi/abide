'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pkgrc = exports.mapPlugins = exports.resolvePlugins = exports.validJsonRequired = exports.existsRequired = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _journey = require('@reggi/journey');

var _journey2 = _interopRequireDefault(_journey);

var _journey3 = require('@reggi/journey.coerce-to-array');

var _journey4 = _interopRequireDefault(_journey3);

var _pkg = require('@reggi/pkg.is-local-module');

var _pkg2 = _interopRequireDefault(_pkg);

var _pkg3 = require('@reggi/pkg.read-json');

var _pkg4 = _interopRequireDefault(_pkg3);

var _pkg5 = require('@reggi/pkg.pretty-json');

var _pkg6 = _interopRequireDefault(_pkg5);

var _pkg7 = require('@reggi/pkg.fs');

var _pkg8 = _interopRequireDefault(_pkg7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var existsRequired = exports.existsRequired = true;
var validJsonRequired = exports.validJsonRequired = true;

var resolvePlugins = exports.resolvePlugins = function resolvePlugins(workingDir, plugins) {
  return plugins.map(function (plugin) {
    plugin = (0, _journey4.default)(plugin);
    var mod = plugin[0];
    var opt = plugin.length === 1 ? false : plugin[1];
    var modPath = false;
    var fn = false;
    if (typeof mod !== 'function') {
      modPath = (0, _pkg2.default)(mod) && !mod.match('^/') ? _path2.default.join(workingDir, mod) : mod;
      var rawRequire = require(modPath);
      fn = rawRequire.default || rawRequire;
      if ((0, _lodash.isArray)(fn)) return resolvePlugins(workingDir, fn);
    } else {
      fn = mod;
    }
    return { mod, opt, modPath, fn };
  });
};

var mapPlugins = exports.mapPlugins = function mapPlugins(workingDir, plugins) {
  return (0, _lodash.flattenDeep)(resolvePlugins(workingDir, plugins));
};

var pkgrc = exports.pkgrc = (0, _journey2.default)(function (_ref) {
  var workingDir = _ref.workingDir,
      write = _ref.write,
      plugin = _ref.plugin,
      stdout = _ref.stdout,
      argv = _ref.argv;
  return [function () {
    return { workingDir, write, stdout, plugin, argv };
  }, function (_ref2) {
    var plugin = _ref2.plugin;
    return { pkgrcRequired: !plugin };
  }, function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
      var workingDir = _ref3.workingDir,
          pkgrcRequired = _ref3.pkgrcRequired;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', _bluebird2.default.props({
                pkgrc: (0, _pkg4.default)({ workingDir, fileName: '.pkgrc', existsRequired: pkgrcRequired, validJsonRequired: pkgrcRequired }),
                pkg: (0, _pkg4.default)({ workingDir, fileName: 'package.json', validJsonRequired })
              }));

            case 1:
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
    var pkgrc = _ref5.pkgrc,
        argv = _ref5.argv;
    return plugin ? { plugins: mapPlugins(workingDir, [argv.plugin]) } : { plugins: mapPlugins(workingDir, pkgrc) };
  }, function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref6) {
      var pkgrc = _ref6.pkgrc,
          plugins = _ref6.plugins,
          pkg = _ref6.pkg,
          argv = _ref6.argv;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bluebird2.default.reduce(plugins, function (acq, _ref8) {
                var fn = _ref8.fn,
                    opt = _ref8.opt,
                    mod = _ref8.mod,
                    modPath = _ref8.modPath;

                return fn({ pkgrc, pkg: acq, workingDir, wd: workingDir, opt, mod, modPath, argv });
              }, pkg || {});

            case 2:
              _context2.t0 = _context2.sent;
              return _context2.abrupt('return', {
                model: _context2.t0
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
  }(), function (_ref9) {
    var model = _ref9.model;
    return { writeFileContent: (0, _pkg6.default)(model) };
  }, function (_ref10) {
    var workingDir = _ref10.workingDir;
    return { writeFilePath: _path2.default.join(workingDir, 'package.json') };
  }, function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref11) {
      var write = _ref11.write,
          writeFilePath = _ref11.writeFilePath,
          writeFileContent = _ref11.writeFileContent;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!write) {
                _context3.next = 7;
                break;
              }

              _context3.next = 3;
              return _pkg8.default.writeFileAsync(writeFilePath, writeFileContent);

            case 3:
              _context3.t1 = _context3.sent;
              _context3.t0 = {
                writeFileResult: _context3.t1
              };
              _context3.next = 8;
              break;

            case 7:
              _context3.t0 = {};

            case 8:
              return _context3.abrupt('return', _context3.t0);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x3) {
      return _ref12.apply(this, arguments);
    };
  }(), function (_ref13) {
    var stdout = _ref13.stdout,
        writeFileContent = _ref13.writeFileContent;
    return stdout ? { stoutResult: process.stdout.write(writeFileContent + '\n') } : {};
  }];
}, { return: 'newContent' });

exports.default = pkgrc;
