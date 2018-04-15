source ./scripts/ensure-installed.sh "dep-merge" "./packages/dep-merge-cli"
source ./scripts/ensure-installed.sh "lerna" "lerna"
echo 'post-install: dep-merge unmerging'
$lerna exec -- $dep_merge ./ --unmerge
