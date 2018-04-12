"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prettyJson = exports.prettyJson = function prettyJson(json) {
  return JSON.stringify(json, null, 2);
};
exports.default = prettyJson;
