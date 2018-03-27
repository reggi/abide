#!/usr/bin/env node
const program = require('commander')
const colors = require('colors/safe')
const hasFlag = require('has-flag')
const {spawn} = require('child_process')
const argvStr = process.argv.join(' ')
const commandMatch = argvStr.match(/-- (.+)$/)
const command = (commandMatch && commandMatch[1]) ? commandMatch[1] : false
const theVersion = require('./package.json').version

const help = hasFlag('h') || hasFlag('H') || hasFlag('help')
const version = hasFlag('v') || hasFlag('V') || hasFlag('version')

program
  .usage('[options] [-- <args>...]')
  .description('print clear exit code from command')
  .option('-n, --no-color', 'remove color')
  .option('-i, --inherit', 'inherit stdin')
  .option('-c, --command-show', 'prints command evaluted')
  .option('-p, --path-show', 'prints current working directory')
  .option('-e, --exit-show', 'shows the Exit code')
  .option('-z, --zero', 'overwrites passed exit code with 0')
  .option('-v, --version', 'output the version number')
  .parse(process.argv)

if (!help && !version && command) {
  const isWindows = process.platform === 'win32'
  var sh = 'sh'
  var shFlag = '-c'
  if (isWindows) {
    sh = 'cmd'
    shFlag = '/c'
  }
  const green = (message) => (program.color) ? colors.green(message) : message
  const red = (message) => (program.color) ? colors.red(message) : message
  const options = (program.inherit) ? {stdio: 'inherit'} : {}
  const cwd = process.cwd()
  const child = spawn(sh, [shFlag, command], options)
  child.on('exit', (code) => {
    let status
    if (code === 0) {
      status = green('success')
    } else if (code !== 0) {
      status = red('failure')
    }
    const values = [status]
    if (program.commandShow) values.push(`(executed ${command})`)
    if (program.pathShow) values.push(`(path ${cwd})`)
    if (program.exitShow) values.push(`(code ${code})`)
    console.log(values.join(' '))
    const theCode = (program.zero) ? 0 : code
    process.exit(theCode)
  })
} else if ((help || !command) && !version) {
  program.help()
} else if (version) {
  console.log(theVersion)
}
