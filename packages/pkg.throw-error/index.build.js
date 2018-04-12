"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var throwNewError = exports.throwNewError = function throwNewError(message) {
  var ErrorObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;

  throw new ErrorObj(message);
};

exports.default = throwNewError;
