'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterUntil = undefined;

var _lodash = require('lodash');

var filterUntil = exports.filterUntil = function filterUntil(arr) {
  var matchFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };

  var match = false;
  return (0, _lodash.filter)(arr, function () {
    if (match) return false;
    var isMatch = matchFn.apply(undefined, arguments);
    if (isMatch) match = true;
    if (match) return false;
    return true;
  });
};

exports.default = filterUntil;
