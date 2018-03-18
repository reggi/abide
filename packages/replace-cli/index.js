#!/usr/bin/env node
const args = process.argv.slice(2)
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
rl.on('line', (line) => process.stdout.write(line.replace(args[0], args[1]) + '\n'))
