'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pkgprop = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _journey = require('@reggi/journey.coerce-to-array');

var _journey2 = _interopRequireDefault(_journey);

var _help = require('@reggi/help.set-entire');

var _help2 = _interopRequireDefault(_help);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _lodash = require('lodash');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkgprop = exports.pkgprop = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var props = _ref.props,
        prop = _ref.prop,
        _ref$packagePath = _ref.packagePath,
        packagePath = _ref$packagePath === undefined ? './package.json' : _ref$packagePath,
        _ref$workingDir = _ref.workingDir,
        workingDir = _ref$workingDir === undefined ? '' : _ref$workingDir;
    var fullProps, fullPackagePath, packageContents, name, questionMessage, questions, results, filterEmptyResults, newProps, newPackage;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fullProps = (0, _journey2.default)(prop || props);
            fullPackagePath = _path2.default.isAbsolute(packagePath) ? packagePath : _path2.default.join(workingDir, packagePath);
            _context.next = 4;
            return _fsExtra2.default.readJson(fullPackagePath, 'utf8');

          case 4:
            packageContents = _context.sent;
            name = (0, _lodash.get)(packageContents, 'name', 'MISSINGPKGNAME');

            questionMessage = function questionMessage(name, prop, packageContents) {
              return `${name} - assign "${prop}"${(0, _lodash.get)(packageContents, prop) ? ` (${(0, _lodash.get)(packageContents, prop)})` : ''}`;
            };

            questions = fullProps.map(function (prop) {
              return { type: 'input', name: prop, message: questionMessage(name, prop, packageContents) };
            });
            _context.next = 10;
            return _inquirer2.default.prompt(questions);

          case 10:
            results = _context.sent;
            filterEmptyResults = (0, _lodash.pickBy)(results, function (result) {
              return result !== '';
            });
            newProps = (0, _help2.default)(filterEmptyResults);
            newPackage = (0, _deepmerge2.default)(packageContents, newProps);
            _context.next = 16;
            return _fsExtra2.default.writeFile(fullPackagePath, (0, _stringify2.default)(newPackage, null, 2));

          case 16:
            return _context.abrupt('return', true);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function pkgprop(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = pkgprop;
