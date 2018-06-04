USAGE="--checkDevDepVersion <dep> (checks a given dev dep version for all lerna packages)"
function checkDevDepVersion () {
  lerna exec -- 'json -f ./package.json -c "(this.devDependencies) ? console.log(this.devDependencies.'$1') : null"'
}
