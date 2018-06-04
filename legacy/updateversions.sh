#!/bin/bash
NAME=`node -e "console.log(require('./package.json').name)"`
echo $NAME
VERSION=`npm view $NAME version`
echo $VERSION
../../node_modules/.bin/json -Ie "this.version='$VERSION'" -f ./package.json
