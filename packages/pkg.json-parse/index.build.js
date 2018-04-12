"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jsonParseForgive = exports.jsonParseForgive = function jsonParseForgive(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    return false;
  }
};

exports.default = jsonParseForgive;
