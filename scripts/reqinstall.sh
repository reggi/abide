#!/bin/bash
source ./scripts/abspath.sh
source ./scripts/ensure-installed.sh "dep-merge" "./packages/dep-merge-cli"
source ./scripts/ensure-installed.sh "lerna" "lerna"
dep_merge_path=`which $dep_merge`
dep_merge_abs=`abspath $dep_merge_path`
echo "req-install: dep-merge relative $dep_merge_path"
echo "req-install: dep-merge absolute $dep_merge_abs"
