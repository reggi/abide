'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifLengthAddProp = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

var _journey = require('@reggi/journey.coerce-to-array');

var _journey2 = _interopRequireDefault(_journey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jestGlobals = ['beforeAll', 'afterAll', 'expect', 'test', 'beforeEach', 'afterEach', 'it', 'jest'];

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

  return (0, _extends3.default)({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      standard: 'standard'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), (0, _extends3.default)({
      'standard': '^11.0.0'
    }, opt.babel ? { 'babel-eslint': '^8.2.2' } : {}))
  }, ifLengthAddProp('standard', (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'standard', {}), (0, _extends3.default)({}, opt.babel ? { 'parser': 'babel-eslint' } : {}, ifLengthAddProp('ignore', [].concat((0, _toConsumableArray3.default)((0, _lodash.get)(pkg, 'standard.ignore', [])), (0, _toConsumableArray3.default)((0, _journey2.default)((0, _lodash.get)(opt, 'ignore', []))))), ifLengthAddProp('globals', [].concat((0, _toConsumableArray3.default)((0, _lodash.get)(pkg, 'standard.global', [])), (0, _toConsumableArray3.default)(opt.jest ? jestGlobals : [])))))));
};
