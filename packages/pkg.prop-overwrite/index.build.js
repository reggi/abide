"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propOverwrite = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propOverwrite = exports.propOverwrite = function propOverwrite(overwrite, existing, incoming) {
  return (0, _extends3.default)({}, overwrite ? existing : {}, incoming, !overwrite ? existing : {});
};

exports.default = propOverwrite;
