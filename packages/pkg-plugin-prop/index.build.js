'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      overwrite = _ref.overwrite,
      opt = _ref.opt;

  if (!opt) return pkg;
  return (0, _lodash.reduce)((0, _lodash.toPairs)(opt), function (acq, pair) {
    var check = (0, _lodash.get)(acq, pair[0]);
    if (check && overwrite || !check) return (0, _lodash.set)(acq, pair[0], pair[1]);
    return acq;
  }, pkg);
};
