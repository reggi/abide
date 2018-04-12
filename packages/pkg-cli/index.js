#!/usr/bin/env node
import pkg from '@reggi/pkg'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const workingDir = process.cwd()

pkg({
  workingDir,
  plugin: argv.plugin,
  write: argv.w || false,
  stdout: !(argv.w && !argv.o),
  argv
})
  .then()
  .catch(console.log)
