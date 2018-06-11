USAGE="--changeDevDepVersion <dep> <version> (changes the dep version for all lerna packages)"
function changeDevDepVersion {
  lerna exec -- 'json --in-place -f ./package.json -e "(this.devDependencies && this.devDependencies[\"'$1'\"]) ? this.devDependencies[\"'$1'\"] = \"'$2'\" : null"'
}
