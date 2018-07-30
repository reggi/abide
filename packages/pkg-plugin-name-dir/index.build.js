'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
  return (0, _extends3.default)({}, pkg, {
    name: name(opt, wd)
  });
};
