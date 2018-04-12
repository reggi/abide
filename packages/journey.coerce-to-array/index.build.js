'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coerceToArray = undefined;

var _lodash = require('lodash');

var coerceToArray = exports.coerceToArray = function coerceToArray(v) {
  return (0, _lodash.isArray)(v) ? v : [v];
};
exports.default = coerceToArray;
