USAGE="--packageVersions (prints the version / package name of each package)"
function packageVersions () {
  lerna exec -- "node -e \"console.log(require('./package.json').version + ' ' + require('path').basename(process.cwd()))\""
}
