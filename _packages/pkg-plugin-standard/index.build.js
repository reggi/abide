'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifLengthAddProp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var jestGlobals = ['expect', 'test', 'beforeEach', 'afterEach'];

var ifLengthAddProp = exports.ifLengthAddProp = function ifLengthAddProp(prop, item) {
  return (0, _lodash.size)(item) ? { [prop]: item } : {};
};

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$pkg = _ref.pkg,
      pkg = _ref$pkg === undefined ? {} : _ref$pkg,
      _ref$overwrite = _ref.overwrite,
      overwrite = _ref$overwrite === undefined ? false : _ref$overwrite,
      _ref$opt = _ref.opt,
      opt = _ref$opt === undefined ? {} : _ref$opt;

  return _extends({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      standard: 'standard'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), _extends({
      'standard': '^11.0.0'
    }, opt.babel ? { 'babel-eslint': '^8.2.2' } : {}))
  }, ifLengthAddProp('standard', (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'standard', {}), _extends({}, opt.babel ? { 'parser': 'babel-eslint' } : {}, ifLengthAddProp('ignore', [].concat(_toConsumableArray((0, _lodash.get)(pkg, 'standard.ignore', [])), _toConsumableArray((0, _lodash.get)(pkg, 'opt.ignore', [])))), ifLengthAddProp('globals', [].concat(_toConsumableArray((0, _lodash.get)(pkg, 'standard.global', [])), _toConsumableArray(opt.jest ? jestGlobals : [])))))));
};
