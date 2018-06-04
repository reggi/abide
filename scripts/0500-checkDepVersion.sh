USAGE="--checkDepVersion <dep> (checks a given dep version for all lerna packages)"
function checkDepVersion () {
  lerna exec -- 'json -f ./package.json -c "(this.dependencies) ? console.log(this.dependencies.'$1') : null"'
}
