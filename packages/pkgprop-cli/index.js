#!/usr/bin/env node
import path from 'path'
import command from '@reggi/command'
import help from '@reggi/help'
import pkgprop from '@reggi/pkgprop'

const getDesign = (argv) => help()
  .name('pkgprop')
  .usage('')
  .description('interactive way to update properties in package.json')
  .option('--prop <string>', 'property to update', 'prop')
  .option('-C, --dir <path>', 'working directory', 'workingDir')
  .option('--pkgpath <path>', 'the path to the sub repo', 'packagePath')
  .option('-h, --help', 'show this output', 'help')
  .option('--version, -v', 'show version number', 'version')
  .parse(argv.slice(2))

const getDir = ({workingDir, cwd}) => {
  const _cwd = cwd()
  if (workingDir && path.isAbsolute(workingDir)) return workingDir
  if (workingDir) return path.join(_cwd, workingDir)
  return _cwd
}

const main = async ({argv, cwd}) => {
  const design = getDesign(argv)
  const workingDir = getDir({workingDir: design.flags.workingDir, cwd})
  const {help, version, prop, packagePath} = design.flags
  if (help) {
    return design.help()
  } else if (version) {
    return require('./package.json').version
  } else if (prop) {
    await pkgprop({workingDir, prop, packagePath})
    return false
  } else {
    throw new Error('invalid arguments')
  }
}

export default command(module, async ({argv, stdout, cwd, exit}) => {
  try {
    const message = await main({argv, cwd})
    if (message) stdout.write(message + '\n')
    return exit(0)
  } catch (e) {
    stdout.write(e.message + '\n')
    exit(1)
    throw e
  }
})
