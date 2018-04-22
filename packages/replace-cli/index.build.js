#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _command2.default)(module, function (_ref) {
  var argv = _ref.argv,
      stdin = _ref.stdin,
      stdout = _ref.stdout,
      exit = _ref.exit;

  var accumulate = false;
  stdin.setEncoding('utf8');
  stdin.on('data', function (data) {
    if (!accumulate) accumulate = '';
    accumulate += data;
  });
  stdin.on('end', function () {
    try {
      var input = argv.slice(2);
      var find = input[0] || false;
      var replace = input[1] || false;
      if (!find) throw new Error('missing find argument');
      if (!replace) throw new Error('missing replace argument');
      if (!accumulate) throw new Error('no data was piped in');
      var pattern = new RegExp(find, 'gm');
      var result = accumulate.replace(pattern, replace);
      stdout.write(result);
      return exit(0);
    } catch (e) {
      return exit(1);
    }
  });
});
