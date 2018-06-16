#!/usr/bin/env node
import path from 'path'
import fs from 'fs-extra'
import {lernaRootBabel, lernaRootBabelCompare} from '@reggi/lerna.utils'
import help from '@reggi/help'
import commandPlus from '@reggi/command-plus'
import pkg from './package.json'

const getDesign = (argv) => help()
  .name('monorepo-babel')
  .description(pkg.description)
  .option('--output, -o', 'creates output of merged babel configs', 'output')
  .option('--compare, -c', 'returns error code if does not match root babel', 'compare')
  .option('--silent, -s', 'silent output', 'silent')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

export default commandPlus(module, async ({argv, cwd}) => {
  const design = getDesign(argv)
  const workingDir = cwd()
  const silent = design.flags.silent
  if (design.flags.help) return design.help()
  if (design.flags.version) return pkg.version
  if (design.flags.output) {
    const {babelConfig} = await lernaRootBabel({workingDir})
    return babelConfig
  }
  if (design.flags.compare) {
    const result = await lernaRootBabelCompare({workingDir})
    if (result && silent) return result
    if (!result && !silent) throw new Error('invalid root babel config')
    return 'valid babel config'
  }
  throw new Error('invalid arguments')
})
