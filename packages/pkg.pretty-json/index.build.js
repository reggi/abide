"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyJson = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyJson = exports.prettyJson = function prettyJson(json) {
  return (0, _stringify2.default)(json, null, 2);
};
exports.default = prettyJson;
