#!/bin/bash
node -e "console.log(Array(50).join('='))"
node -e "console.log(require('./package').name)"
node -e "console.log(require('./package').dependencies)"
