"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pattern = exports.pattern = /^.\.\/|^.\/|^\//;
var moduleIsLocal = exports.moduleIsLocal = function moduleIsLocal(str) {
  return Boolean(str.match(pattern));
};
exports.default = moduleIsLocal;
