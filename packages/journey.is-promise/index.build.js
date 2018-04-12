'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPromise = exports.isPromise = function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
exports.default = isPromise;
