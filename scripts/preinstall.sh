#!/bin/bash
source ./scripts/abspath.sh
source ./scripts/ensure-installed.sh "dep-merge" "./packages/dep-merge-cli"
source ./scripts/ensure-installed.sh "lerna" "lerna"
echo 'post-install: dep-merge merging'
dep_merge_path=`which $dep_merge`
dep_merge_abs=`abspath $dep_merge_path`
echo $dep_merge_path
echo $dep_merge_abs
$lerna exec -- $dep_merge_abs ./
