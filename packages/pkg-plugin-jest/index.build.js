'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hunderedPercent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _journey = require('@reggi/journey.coerce-to-array');

var _journey2 = _interopRequireDefault(_journey);

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

  return _extends({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      'jest': 'jest',
      'jest:coverage': 'jest --coverage'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), _extends({}, opt.babel ? { 'babel-jest': '^22.4.1' } : {}, {
      'jest': '^22.4.2'
    })),
    jest: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'jest', {}), _extends({}, opt.hunderedPercent ? hunderedPercent(opt.forceCoverageMatch) : {}, opt.forceCoverageMatch ? { 'forceCoverageMatch': [].concat(_toConsumableArray((0, _lodash.get)(pkg, 'jest.forceCoverageMatch', {})), _toConsumableArray((0, _journey2.default)(opt.forceCoverageMatch))) } : {}))
  });
};
