USAGE="--rmLock (removes package-lock.json from all packages)"
function rmLock () {
  $lerna exec -- rm -rf package-lock.json
  $lerna exec -- rm -rf npm-shrinkwrap.json
}
