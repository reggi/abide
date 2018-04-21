#!/usr/bin/env node
import execa from 'execa'
import help, {assign} from '@reggi/help'
import command from '@reggi/command'
import {basename} from 'path'
import colors from 'colors/safe'
import debug from 'debug'

const d = debug('results-cli')

const getDesign = (argv) => help()
  .name('results')
  .usage('[-- <args>...]')
  .description('print clear exit code from command')
  .option('-u, --no-color', 'hide color')
  .option('-i, --inherit', 'inherit stdin', 'inherit')
  .option('-C, --dir <path>', 'working directory to use', 'workingDir')
  .option('-c, --command-show', 'prints command evaluted', 'showCommand')
  .option('-p, --path-show', 'prints current working path', 'showPath')
  .option('-d, --dir-show', 'prints current working directory', 'showDir')
  .option('-e, --exit-show', 'shows the Exit code', 'showExit')
  .option('-z, --zero', 'overwrites passed exit code with 0', 'zero')
  .option('-v, --version', 'output the version number', 'version')
  .option('-s, --silent', 'hide output from this command', 'silent')
  .option('-h, --help', 'show this output', 'help')
  .parse(argv.slice(2))

const status = ({code, color}) => {
  const green = (message) => (color) ? colors.green(message) : message
  const red = (message) => (color) ? colors.red(message) : message
  if (code === 0) return green('success')
  return red('failure')
}

const response = ({design, color, code, cmd, cwd}) => {
  const values = [status({code, color})]
  if (design.flags.showCommand) values.push(`(executed ${cmd})`)
  if (design.flags.showPath) values.push(`(path ${cwd})`)
  if (design.flags.showDir) values.push(`(directory /${basename(cwd)})`)
  if (design.flags.showExit) values.push(`(code ${code})`)
  return values.join(' ')
}

const getCode = async ({cmd, workingDir, stdio}) => {
  try {
    const commandResponse = await execa.shell(cmd, {cwd: workingDir, stdio})
    return commandResponse.code
  } catch (e) {
    return e.code
  }
}

const getColor = (design) => {
  if (design.flags['-u']) return false
  if (design.flags['--color']) return design.flags['--color']
  return true
}

export default command(module, async ({argv, stdout, exit, cwd}) => {
  const design = getDesign(argv)
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
    const code = await getCode({cmd, workingDir, stdio})
    const color = getColor(design)
    const exitCode = (design.flags.zero) ? 0 : code
    stdout.write(response({design, color, code, cmd, cwd: workingDir}) + '\n')
    return exit(exitCode)
  } else {
    d('else case')
    if (!design.flags.silent) stdout.write('invalid arguments')
    return exit(1)
  }
})
