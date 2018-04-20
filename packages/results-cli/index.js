#!/usr/bin/env node
import execa from 'execa'
import help, {rename} from '@reggi/help'
import command from '@reggi/command'
import {basename} from 'path'
import colors from 'colors/safe'
import debug from 'debug'

const d = debug('results-cli')

const getDesign = (argv) => help()
  .name('results')
  .usage('[-- <args>...]')
  .description('print clear exit code from command')
  .option('-u, --color', 'use color', rename('color', true))
  .option('-i, --inherit', 'inherit stdin', 'inherit')
  .option('-C, --dir <path>', 'working directory to use', 'workingDir')
  .option('-c, --command-show', 'prints command evaluted', 'showCommand')
  .option('-p, --path-show', 'prints current working path', 'showPath')
  .option('-d, --dir-show', 'prints current working directory', 'showDir')
  .option('-e, --exit-show', 'shows the Exit code', 'showExit')
  .option('-z, --zero', 'overwrites passed exit code with 0', 'zero')
  .option('-v, --version', 'output the version number', 'version')
  .option('-h, --help', 'show this output', 'help')
  .parse(argv.slice(2))

const status = ({code, color}) => {
  const green = (message) => (color) ? colors.green(message) : message
  const red = (message) => (color) ? colors.red(message) : message
  let status
  if (code === 0) {
    status = green('success')
  } else if (code !== 0) {
    status = red('failure')
  }
  return status
}

export default command(module, async ({argv, stdout, exit, cwd}) => {
  const design = getDesign(argv)
  console.log(design)
  d('design fetched')
  if (design.flags.help) {
    d('help hit')
    stdout.write(design.help() + '\n')
    return exit(0)
  } else if (design.flags.version) {
    d('version hit')
    const pkg = require('./package.json')
    stdout.write(pkg.version + '\n')
    return exit(0)
  } else if (design.flags['--']) {
    d('running main')
    const cmd = design.flags['--']
    const workingDir = design.flags.workingDir || cwd()
    const stdio = (design.flags.inherit) ? 'inherit' : 'pipe'
    const {code} = await execa.shell(cmd, {cwd: workingDir, stdio})
    const exitCode = (design.flags.zero) ? 0 : code
    const values = [status({code, color: design.flags.color})]
    if (design.flags.showCommand) values.push(`(executed ${cmd})`)
    if (design.flags.showPath) values.push(`(path ${cwd})`)
    if (design.flags.showDir) values.push(`(directory /${basename(cwd)})`)
    if (design.flags.showExit) values.push(`(code ${code})`)
    stdout.write(values.join(' ') + '\n')
    process.exit(exitCode)
  } else {
    d('else case')
    if (!design.flags.silent) stdout.write('invalid arguments')
    return exit(1)
  }
})
