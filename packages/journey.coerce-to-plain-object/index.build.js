'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coerceToPlainObject = undefined;

var _lodash = require('lodash');

var coerceToPlainObject = exports.coerceToPlainObject = function coerceToPlainObject(v) {
  return (0, _lodash.isPlainObject)(v) ? v : {};
};
exports.default = coerceToPlainObject;
