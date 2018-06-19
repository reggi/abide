"use strict";

var command = function command(m, fn) {
  var _process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process;

  if (require.main === m) {
    return fn(_process);
  } else {
    return fn;
  }
};

module.exports = command;
