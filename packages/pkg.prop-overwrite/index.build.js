"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var propOverwrite = exports.propOverwrite = function propOverwrite(overwrite, existing, incoming) {
  return _extends({}, overwrite ? existing : {}, incoming, !overwrite ? existing : {});
};

exports.default = propOverwrite;
