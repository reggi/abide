'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsert = exports.updatedRecord = exports.defaultQuery = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _journey = require('@reggi/journey');

var _journey2 = _interopRequireDefault(_journey);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = exports.defaultQuery = function defaultQuery(prop) {
  return function (i, r) {
    return i[prop] === r[prop];
  };
};
var updatedRecord = exports.updatedRecord = function updatedRecord(arr, record, index) {
  return (0, _extends3.default)({}, (0, _lodash.get)(arr, index, {}), record);
};

var upsert = exports.upsert = (0, _journey2.default)(function (arr, record, query) {
  return [function () {
    return { arr, record, query };
  }, function (_ref) {
    var query = _ref.query;
    return { queryFn: typeof query === 'string' ? defaultQuery(query) : query };
  }, function (_ref2) {
    var arr = _ref2.arr,
        queryFn = _ref2.queryFn;
    return { findIndex: (0, _lodash.findIndex)(arr, function (i) {
        return queryFn(i, record);
      }) };
  }, function (_ref3) {
    var arr = _ref3.arr,
        index = _ref3.index;
    return { front: (0, _lodash.take)(arr, index) };
  }, function (_ref4) {
    var arr = _ref4.arr,
        front = _ref4.front;
    return { takeRightAmount: arr.length - (front.length + 1) };
  }, function (_ref5) {
    var arr = _ref5.arr,
        index = _ref5.index,
        takeRightAmount = _ref5.takeRightAmount;
    return { back: (0, _lodash.takeRight)(arr, takeRightAmount) };
  }, function (_ref6) {
    var arr = _ref6.arr,
        findIndex = _ref6.findIndex,
        front = _ref6.front,
        record = _ref6.record,
        back = _ref6.back;
    return { return: findIndex >= 0 ? [].concat((0, _toConsumableArray3.default)(front), [updatedRecord(arr, record, findIndex)], (0, _toConsumableArray3.default)(back)) : [].concat((0, _toConsumableArray3.default)(arr), [record]) };
  }];
}, { return: true });

exports.default = upsert;
