'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEntire = undefined;

var _lodash = require('lodash');

var setEntire = exports.setEntire = function setEntire(obj) {
  var newObj = {};
  (0, _lodash.each)(obj, function (value, key) {
    (0, _lodash.set)(newObj, key, value);
  });
  return newObj;
};

exports.default = setEntire;
