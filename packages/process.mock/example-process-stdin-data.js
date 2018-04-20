#!/usr/bin/env node
import {includes} from 'lodash'
const {stdin, stdout, exit, argv} = process

// constants
const args = argv.slice(2)
const invalid = ['', '\n']

let ret = ''
stdin.setEncoding('utf8')
stdin.on('data', (data) => {
  ret += data
})
stdin.on('end', () => {
  try {
    if (args.length !== 2) {
      return exit(1)
    }
    if (includes(invalid, ret.trim())) {
      return exit(1)
    }
    const pattern = new RegExp(args[0], 'gm')
    const result = ret.replace(pattern, args[1])
    stdout.write(result)
    return exit(0)
  } catch (e) {
    return exit(1)
  }
})
