#!/usr/bin/env node
import pkg from '@reggi/pkg'
import minimist from 'minimist'
import fs from '@reggi/pkg.fs'
import path from 'path'
const argv = minimist(process.argv.slice(2))
const workingDir = process.cwd()
pkg({workingDir, argv})
  .then(results => {
    if (argv.w) return fs.writeFileAsync(path.join(workingDir, 'package.json'), results)
    return process.stdout.write(results + '\n')
  })
  .catch(console.log)
