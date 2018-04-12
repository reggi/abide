#!/usr/bin/env node
'use strict';

var _require = require('path'),
    basename = _require.basename;

var program = require('commander');
var colors = require('colors/safe');
var hasFlag = require('has-flag');

var _require2 = require('child_process'),
    spawn = _require2.spawn;

var argvStr = process.argv.join(' ');
var commandMatch = argvStr.match(/-- (.+)$/);
var command = commandMatch && commandMatch[1] ? commandMatch[1] : false;
var theVersion = require('./package.json').version;

var help = hasFlag('h') || hasFlag('H') || hasFlag('help');
var version = hasFlag('v') || hasFlag('V') || hasFlag('version');

program.usage('[options] [-- <args>...]').description('print clear exit code from command').option('-n, --hello', 'remove color').option('-n, --no-color', 'remove color').option('-i, --inherit', 'inherit stdin').option('-c, --command-show', 'prints command evaluted').option('-p, --path-show', 'prints current working path').option('-d, --dir-show', 'prints current working directory').option('-e, --exit-show', 'shows the Exit code').option('-z, --zero', 'overwrites passed exit code with 0').option('-v, --version', 'output the version number').option('-h, --help', 'output the').parse(process.argv);

if (!help && !version && command) {
  var isWindows = process.platform === 'win32';
  var sh = 'sh';
  var shFlag = '-c';
  if (isWindows) {
    sh = 'cmd';
    shFlag = '/c';
  }
  var green = function green(message) {
    return program.color ? colors.green(message) : message;
  };
  var red = function red(message) {
    return program.color ? colors.red(message) : message;
  };
  var options = program.inherit ? { stdio: 'inherit' } : {};
  var cwd = process.cwd();
  var child = spawn(sh, [shFlag, command], options);
  child.on('exit', function (code) {
    var status = void 0;
    if (code === 0) {
      status = green('success');
    } else if (code !== 0) {
      status = red('failure');
    }
    var values = [status];
    if (program.commandShow) values.push(`(executed ${command})`);
    if (program.pathShow) values.push(`(path ${cwd})`);
    if (program.dirShow) values.push(`(directory /${basename(cwd)})`);
    if (program.exitShow) values.push(`(code ${code})`);
    process.stdout.write(values.join(' ') + '\n');
    var theCode = program.zero ? 0 : code;
    process.exit(theCode);
  });
} else if ((help || !command) && !version) {
  program.outputHelp();
} else if (version) {
  process.stdout.write(theVersion + '\n');
  process.exit(0);
}
