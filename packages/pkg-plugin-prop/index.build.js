'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      opt = _ref.opt;

  if (!opt) return pkg;
  return (0, _lodash.reduce)((0, _lodash.toPairs)(opt), function (acq, pair) {
    return (0, _lodash.set)(acq, pair[0], pair[1]);
  }, pkg);
};
