USAGE="--changeDepVersion <dep> <version> (changes the dep version for all lerna packages)"
function changeDepVersion {
  lerna exec -- 'json --in-place -f ./package.json -e "(this.dependencies && this.dependencies[\"'$1'\"]) ? this.dependencies[\"'$1'\"] = \"'$2'\" : null"'
}
