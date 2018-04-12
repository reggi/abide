'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      wd = _ref.wd,
      opt = _ref.opt;

  if (!pkg.name) throw new Error('missing name');
  var ogName = pkg.name;
  var splitName = ogName.split('/');
  var name = splitName.length >= 2 ? splitName[1] : ogName;
  return _extends({}, pkg, {
    name: `${opt}/${name}`
  });
};
