#!/usr/bin/env node
import help from '@reggi/help'
import {get, flattenDeep} from 'lodash'

const design = help()
  .name('requireable')
  .description('Check and see if a module is requireable in node')
  .option('--module <path>', 'path to the local module')
  .option('--node <path>', 'path to the node binary')
  .option('--verbose', 'show debug content')
  .option('--help, -h', 'generate this output')
  .option('--version, -v', 'show version number')
  .option('--silent, -s', 'no output')
  .parse(process.argv.slice(2))

const flags = design.flags

const modPath = flags['--module'] || get(flattenDeep(flags._), '0') || false
const nodeBin = flags['--node'] || false
const verbose = flags['--verbose'] || false
const version = flags['--version'] || false
const silent = flags['--silent'] || false
const needsHelp = flags['--help'] || false

if (verbose) {
  process.env['DEBUG'] = 'requireable-cli,requireable:*'
}

const requireable = require('@reggi/requireable').default
const d = require('debug')('requireable-cli')

d({modPath, nodeBin, verbose, version, silent, needsHelp})

if (needsHelp) {
  process.stdout.write(design.help() + '\n')
  process.exit(0)
} else if (version) {
  const pkg = require('./package.json')
  process.stdout.write(pkg.version + '\n')
  process.exit(0)
} else if (modPath) {
  Promise.resolve()
    .then(async () => {
      const inherit = silent || true
      const {success} = await requireable({modPath, nodeBin, inherit})
      if (!success) throw new Error('unsuccessful result use --verbose for more info')
      process.exit(0)
    })
    .catch(e => {
      if (verbose) throw e
      process.exit(1)
    })
} else {
  if (verbose) throw new Error('invalid arguments')
  if (!verbose && !silent) process.stderr.write('invalid arguments')
  process.exit(1)
}