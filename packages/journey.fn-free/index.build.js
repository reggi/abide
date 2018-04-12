'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnFree = exports.ERROR_RESOLVE_NOT_FN = exports.ERROR_FN_NOT_FN = undefined;

var _journey = require('@reggi/journey.is-promise');

var _journey2 = _interopRequireDefault(_journey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR_FN_NOT_FN = exports.ERROR_FN_NOT_FN = 'fn arg is not function type';
var ERROR_RESOLVE_NOT_FN = exports.ERROR_RESOLVE_NOT_FN = 'resolve arg is not function type';

var fnFree = exports.fnFree = function fnFree(fn, resolve) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (typeof fn !== 'function') throw new Error(ERROR_FN_NOT_FN);
  if (typeof resolve !== 'function') throw new Error(ERROR_RESOLVE_NOT_FN);
  var main = function main() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var fnResult = fn.apply(null, args);
    if ((0, _journey2.default)(fnResult)) return fnResult.then(resolve);
    return resolve(fnResult);
  };
  props.forEach(function (prop) {
    main[prop] = fn;
  });
  return main;
};

exports.default = fnFree;
