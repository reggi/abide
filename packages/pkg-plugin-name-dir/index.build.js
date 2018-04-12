'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = function name(opt, wd) {
  var name = _path2.default.basename(wd);
  if (opt.kebab) return (0, _lodash.kebabCase)(name);
  return name;
};

exports.default = function (_ref) {
  var _ref$pkg = _ref.pkg,
      pkg = _ref$pkg === undefined ? {} : _ref$pkg,
      _ref$opt = _ref.opt,
      opt = _ref$opt === undefined ? {} : _ref$opt,
      wd = _ref.wd;
  return _extends({}, pkg, {
    name: name(opt, wd)
  });
};
