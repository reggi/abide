'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sortPackageJson = require('sort-package-json');

exports.default = function (_ref) {
  var pkg = _ref.pkg;

  return sortPackageJson(pkg);
};
