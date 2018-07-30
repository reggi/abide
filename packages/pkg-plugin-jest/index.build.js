'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hunderedPercent = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _journey = require('@reggi/journey.coerce-to-array');

var _journey2 = _interopRequireDefault(_journey);

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hunderedPercent = exports.hunderedPercent = function hunderedPercent() {
  return {
    'collectCoverage': true,
    'coverageThreshold': {
      'global': {
        'branches': 100,
        'functions': 100,
        'lines': 100,
        'statements': 100
      }
    }
  };
};

exports.default = function (_ref) {
  var pkgrc = _ref.pkgrc,
      overwrite = _ref.overwrite,
      pkg = _ref.pkg,
      opt = _ref.opt;

  return (0, _extends3.default)({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      'jest': 'jest',
      'jest:coverage': 'jest --coverage'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), (0, _extends3.default)({}, opt.babel ? { 'babel-jest': '^22.4.1' } : {}, {
      'jest': '^22.4.2'
    })),
    jest: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'jest', {}), (0, _extends3.default)({}, opt.hunderedPercent ? hunderedPercent(opt.forceCoverageMatch) : {}, opt.forceCoverageMatch ? { 'forceCoverageMatch': [].concat((0, _toConsumableArray3.default)((0, _lodash.get)(pkg, 'jest.forceCoverageMatch', {})), (0, _toConsumableArray3.default)((0, _journey2.default)(opt.forceCoverageMatch))) } : {}))
  });
};
