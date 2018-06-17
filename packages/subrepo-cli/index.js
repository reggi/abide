#!/usr/bin/env node
import {get, flattenDeep} from 'lodash'
import commandPlus from '@reggi/command-plus'
import help from '@reggi/help'
import subrepo from '@reggi/subrepo'

const getDesign = (argv) => help()
  .name('subrepo')
  .usage('[repo] [flags]')
  .description('uses git filter-branch subdirectory-filter and clones the result')
  .option('--source <repo>', 'source git repo', 'source')
  .option('-C, --dir <path>', 'working directory', 'workingDir')
  .option('--subpath, --subrepopath, --subdirectory-filter <path>', 'the path to the sub repo', 'subrepoPath')
  .option('--dest, --destdir <path>', 'the path to the sub repo', 'destDir')
  .option('-h, --help', 'show this output', 'help')
  .option('--version, -v', 'show version number', 'version')
  .parse(argv.slice(2))

export default commandPlus(module, async ({argv, stdout, cwd, exit}) => {
  const design = getDesign(argv)
  const source = design.flags.source || get(flattenDeep(design.flags._), '0', false)
  const workingDir = design.flags.workingDir || cwd()
  const {help, version, subrepoPath, destDir} = design.flags
  if (help) return design.help()
  if (version) return require('./package.json').version
  if (source && subrepoPath && destDir) {
    await subrepo({workingDir, source, subrepoPath, destDir})
    return true
  }
  throw new Error('invalid arguments')
})
