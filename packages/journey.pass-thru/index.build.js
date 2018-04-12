'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passThru = exports.ERROR_NO_FN_PASSED = undefined;

var _journey = require('@reggi/journey.is-promise');

var _journey2 = _interopRequireDefault(_journey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_NO_FN_PASSED = exports.ERROR_NO_FN_PASSED = 'first argument should be a function or falsey';

var passThru = exports.passThru = function passThru(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!fn) return args;
  if (typeof fn !== 'function') throw new Error(ERROR_NO_FN_PASSED);
  var fnResult = fn.apply(null, args);
  if ((0, _journey2.default)(fnResult)) fnResult.then();
  return args;
};

exports.default = passThru;
