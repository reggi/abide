#!/bin/bash
source ./scripts/reqinstall.sh
echo 'post-install: dep-merge unmerging...'
$lerna exec -- $dep_merge_abs --unmerge --merge --path ./
echo 'post-install: dep-merge done'
