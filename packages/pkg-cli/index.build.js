#!/usr/bin/env node
'use strict';

var _pkg = require('@reggi/pkg');

var _pkg2 = _interopRequireDefault(_pkg);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));
var workingDir = process.cwd();

(0, _pkg2.default)({
  workingDir,
  plugin: argv.plugin,
  write: argv.w || false,
  stdout: !(argv.w && !argv.o),
  argv
}).then().catch(console.log);
