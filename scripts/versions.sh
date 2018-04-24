#!/bin/bash
lerna exec -- "node -e \"console.log(require('./package.json').version + ' ' + require('path').basename(process.cwd()))\""
