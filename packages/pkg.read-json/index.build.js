'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJson = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _journey = require('@reggi/journey');

var _pkg = require('@reggi/pkg.file-exists');

var _pkg2 = _interopRequireDefault(_pkg);

var _pkg3 = require('@reggi/pkg.fs');

var _pkg4 = _interopRequireDefault(_pkg3);

var _pkg5 = require('@reggi/pkg.throw-error');

var _pkg6 = _interopRequireDefault(_pkg5);

var _pkg7 = require('@reggi/pkg.json-parse');

var _pkg8 = _interopRequireDefault(_pkg7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readJson = exports.readJson = (0, _journey.journey)(function (_ref) {
  var workingDir = _ref.workingDir,
      fileName = _ref.fileName,
      _ref$existsRequired = _ref.existsRequired,
      existsRequired = _ref$existsRequired === undefined ? false : _ref$existsRequired,
      _ref$validJsonRequire = _ref.validJsonRequired,
      validJsonRequired = _ref$validJsonRequire === undefined ? false : _ref$validJsonRequire;
  return [function () {
    return { workingDir, fileName, existsRequired, validJsonRequired };
  }, function (_ref2) {
    var workingDir = _ref2.workingDir,
        fileName = _ref2.fileName;
    return { filePath: _path2.default.join(workingDir, fileName) };
  }, function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
      var filePath = _ref3.filePath;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _pkg2.default)(filePath);

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
  }(), function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
      var fileName = _ref5.fileName,
          fileExists = _ref5.fileExists,
          existsRequired = _ref5.existsRequired;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', !fileExists && existsRequired && (0, _pkg6.default)(`missing ${fileName} file in ${workingDir}`));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref6.apply(this, arguments);
    };
  }(), function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
      var filePath = _ref7.filePath,
          fileExists = _ref7.fileExists;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!fileExists) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return _pkg4.default.readFileAsync(filePath, 'utf8');

            case 3:
              _context3.t0 = _context3.sent;
              _context3.next = 7;
              break;

            case 6:
              _context3.t0 = false;

            case 7:
              _context3.t1 = _context3.t0;
              return _context3.abrupt('return', {
                fileContent: _context3.t1
              });

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x3) {
      return _ref8.apply(this, arguments);
    };
  }(), function (_ref9) {
    var fileContent = _ref9.fileContent,
        validJsonRequired = _ref9.validJsonRequired;
    return { fileJson: fileContent && validJsonRequired ? JSON.parse(fileContent) : (0, _pkg8.default)(fileContent) };
  }];
}, { return: 'fileJson' });

exports.default = readJson;
