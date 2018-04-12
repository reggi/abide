#!/usr/bin/env node
'use strict';

var _lodash = require('lodash');

var _process = process,
    stdin = _process.stdin,
    stdout = _process.stdout,
    exit = _process.exit,
    argv = _process.argv;

// constants

var args = argv.slice(2);
var invalid = ['', '\n'];

var ret = '';
stdin.setEncoding('utf8');
stdin.on('data', function (data) {
  ret += data;
});
stdin.on('end', function () {
  try {
    if (args.length !== 2) {
      return exit(1);
    }
    if ((0, _lodash.includes)(invalid, ret.trim())) {
      return exit(1);
    }
    var pattern = new RegExp(args[0], 'gm');
    var result = ret.replace(pattern, args[1]);
    stdout.write(result);
    return exit(0);
  } catch (e) {
    return exit(1);
  }
});
