#!/usr/bin/env node
import {{lernaRootBabel, lernaRootBabelCompare}} from '@reggi/lerna.utils'
import help from '@reggi/help'
import command from '@reggi/command'
import debug from 'debug'
import pkg from './package.json'

const d = debug('monorepo-root-babel-cli')

const getDesign = (argv) => help()
  .name('monorepo-root-babel')
  .description(pkg.description)
  .option('--output, -o', 'creates output of merged babel configs', 'output')
  .option('--compare, -c', 'returns error code if does not match root babel', 'compare')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

export default command(module, async ({argv, stdout, stderr, cwd, exit}) => {
  const design = getDesign(argv)
  if (design.flags.help) {
    d('help hit')
    stdout.write(design.help() + '\n')
    return exit(0)
  } else if (design.flags.version) {
    d('version hit')
    const pkg = require('./package.json')
    stdout.write(pkg.version + '\n')
    return exit(0)
  } else {
    if (design.flags.output) {
      const {babelConfig} = await lernaRootBabel({workingDir})
      stdout.write(JSON.stringify(babelConfig, null, 2) + '\n')
    } else if (design.flags.compare) {
      const compared = await lernaRootBabelCompare({workingDir})
      return (compared) ? exit(0) : exit(1)
    }
  }
})
