#!/bin/bash
source ./scripts/reqinstall.sh
echo 'pre-install: dep-merge merging...'
$lerna exec -- $dep_merge_abs ./
echo 'pre-install: dep-merge done'
