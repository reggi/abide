USAGE="--packageName (prints the name of a node pacakge via package.json)"
function packageName () {
  node -e "console.log(require('./package').name)"
}
