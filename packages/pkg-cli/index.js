#!/usr/bin/env node
import pkg from '@reggi/pkg'
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))
const workingDir = process.cwd()
pkg({workingDir, argv})
  .then(console.log)
  .catch(console.log)
