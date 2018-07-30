'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnReduce = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _journey = require('@reggi/journey.coerce-to-plain-object');

var _journey2 = _interopRequireDefault(_journey);

var _journey3 = require('@reggi/journey.pass-thru');

var _journey4 = _interopRequireDefault(_journey3);

var _journey5 = require('@reggi/journey.is-promise');

var _journey6 = _interopRequireDefault(_journey5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnReduce = exports.fnReduce = function fnReduce(fns) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var hook = arguments[2];

  return fns.reduce(function (acq, fn) {
    var handleResult = function handleResult(acq, result) {
      return cleanResult.apply(null, hookResult(acq, result));
    };
    var cleanResult = function cleanResult(acq, result) {
      return (0, _extends3.default)({}, (0, _journey2.default)(acq), (0, _journey2.default)(result));
    };
    var hookResult = function hookResult(acq, result) {
      return (0, _journey4.default)(hook, acq, result);
    };
    var handleResultPossiblePromise = function handleResultPossiblePromise(acq, result) {
      var resultIsPromise = (0, _journey6.default)(result);
      if (resultIsPromise) return result.then(function (result) {
        return handleResult(acq, result);
      });
      return handleResult(acq, result);
    };
    var handleAcqPossiblePromise = function handleAcqPossiblePromise(acq) {
      var acqIsPromise = (0, _journey6.default)(acq);
      if (acqIsPromise) return acq.then(function (acq) {
        return handleResultPossiblePromise(acq, fn(acq));
      });
      return handleResultPossiblePromise(acq, fn(acq));
    };
    return handleAcqPossiblePromise(acq);
  }, state);
};

exports.default = fnReduce;
