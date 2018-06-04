USAGE="--nuke (cleans all installed npm modules, cache and lock files from the monorepo)"
function nuke () {
  lerna="$(ensureInstalledBinModule "lerna" "lerna")"
  npm cache clean --force
  rm -rf ./node_modules
  rm -rf ./package-lock.json
  $lerna exec -- rm -rf package-lock.json
  $lerna exec -- rm -rf npm-shrinkwrap.json
  $lerna exec -- rm -rf etc
  $lerna clean --yes
}
