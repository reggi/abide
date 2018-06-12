'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shebangCheck = exports.verifyFiles = exports.validateAllFiles = exports.binFileContent = exports.fullBinFilePaths = exports.coerceBin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _journey = require('@reggi/journey');

var _journey2 = _interopRequireDefault(_journey);

var _shebangRegex = require('shebang-regex');

var _shebangRegex2 = _interopRequireDefault(_shebangRegex);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coerceBin = exports.coerceBin = function coerceBin(pkgContent) {
  if (!pkgContent.bin) return [];
  if ((0, _lodash.isString)(pkgContent.bin)) return [pkgContent.bin];
  if ((0, _lodash.isPlainObject)(pkgContent.bin)) return (0, _lodash.values)(pkgContent.bin);
  throw new Error('invalid package bin');
};

var fullBinFilePaths = exports.fullBinFilePaths = function fullBinFilePaths(_ref) {
  var workingDir = _ref.workingDir,
      binFiles = _ref.binFiles;
  return (0, _lodash.map)(binFiles, function (binFile) {
    return _path2.default.join(workingDir, binFile);
  });
};
var binFileContent = exports.binFileContent = function binFileContent(fullBinFilePath) {
  return _fsExtra2.default.readFile(fullBinFilePath, 'utf8');
};
var validateAllFiles = exports.validateAllFiles = function validateAllFiles(files) {
  return (0, _lodash.map)(files, function (file) {
    return _shebangRegex2.default.test(file);
  });
};
var verifyFiles = exports.verifyFiles = function verifyFiles(uniqueResults) {
  if (!uniqueResults.length) return null;
  if (uniqueResults.length === 1 && uniqueResults[0]) return true;
  return false;
};

var shebangCheck = exports.shebangCheck = (0, _journey2.default)(function (_ref2) {
  var workingDir = _ref2.workingDir;
  return [function () {
    return { workingDir };
  }, function (_ref3) {
    var workingDir = _ref3.workingDir;
    return { pkgPath: _path2.default.join(workingDir, 'package.json') };
  }, function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref4) {
      var pkgPath = _ref4.pkgPath;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _fsExtra2.default.readJson(pkgPath);

            case 2:
              _context.t0 = _context.sent;
              return _context.abrupt('return', {
                pkgContent: _context.t0
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref5.apply(this, arguments);
    };
  }(), function (_ref6) {
    var pkgContent = _ref6.pkgContent;
    return { binFiles: coerceBin(pkgContent) };
  }, function (_ref7) {
    var binFiles = _ref7.binFiles;
    return { fullBinFilePaths: fullBinFilePaths({ workingDir, binFiles }) };
  }, function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref8) {
      var fullBinFilePaths = _ref8.fullBinFilePaths;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bluebird2.default.map(fullBinFilePaths, binFileContent);

            case 2:
              _context2.t0 = _context2.sent;
              return _context2.abrupt('return', {
                fileContents: _context2.t0
              });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref9.apply(this, arguments);
    };
  }(), function (_ref10) {
    var fileContents = _ref10.fileContents;
    return { validateAllFiles: validateAllFiles(fileContents) };
  }, function (_ref11) {
    var validateAllFiles = _ref11.validateAllFiles;
    return { uniqValidateAllFiles: (0, _lodash.uniq)(validateAllFiles) };
  }, function (_ref12) {
    var uniqValidateAllFiles = _ref12.uniqValidateAllFiles;
    return { verifyFiles: verifyFiles(uniqValidateAllFiles) };
  }];
}, { return: 'verifyFiles' });

exports.default = shebangCheck;
