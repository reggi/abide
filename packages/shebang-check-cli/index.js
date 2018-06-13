#!/usr/bin/env node
import shebangCheck from '@reggi/shebang-check'
import help from '@reggi/help'
import commandPlus from '@reggi/command-plus'
import pkg from './package.json'

const getDesign = (argv) => help()
  .name('shebang-check')
  .description(pkg.description)
  .option('--dir [dir]', 'directory to run in', 'directory')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

export default commandPlus(module, async ({argv, cwd}) => {
  const design = getDesign(argv)
  const workingDir = design.flags.directory || cwd()
  if (design.flags.help) return design.help()
  if (design.flags.version) return pkg.version
  const results = shebangCheck({workingDir})
  return results
})
