#!/usr/bin/env node
import {lernaRootBabel, lernaRootBabelCompare} from '@reggi/lerna.utils'
import help from '@reggi/help'
import command from '@reggi/command'
import pkg from './package.json'
import {isString, isPlainObject} from 'lodash'

const getDesign = (argv) => help()
  .name('monorepo-babel')
  .description(pkg.description)
  .option('--output, -o', 'creates output of merged babel configs', 'output')
  .option('--compare, -c', 'returns error code if does not match root babel', 'compare')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

const resolveBooleanResponse = (b) => {
  return {
    stdout: (b) ? 'valid' : 'invalid',
    exitCode: (b) ? 0 : 1
  }
}

const main = async ({argv, cwd}) => {
  const design = getDesign(argv)
  const workingDir = cwd()
  if (design.flags.help) return design.help()
  if (design.flags.version) return pkg.version
  if (design.flags.output) return JSON.stringify((await lernaRootBabel({workingDir})).babelConfig, null, 2)
  if (design.flags.compare) return resolveBooleanResponse(await lernaRootBabelCompare({workingDir}))
  throw new Error('invalid arguments')
}

export default command(module, async ({argv, cwd, exit, stdout, stderr}) => {
  try {
    const results = await main({argv, cwd})
    if (isString(results)) {
      stdout.write(results + '\n')
      return exit(0)
    } else if (isPlainObject(results)) {
      if (results.stdout) stdout.write(results.stdout + '\n')
      if (results.stderr) stderr.write(results.stderr + '\n')
      if (results.exit) return exit(results.exit)
      return exit(0)
    }
  } catch (e) {
    stdout.write(e.message + '\n')
    return exit(1)
  }
})
