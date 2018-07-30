USAGE="--addProp <prop> <value> (adds a prop to package.json)"
function addProp () {
  json --in-place -f $PWD/package.json -e "this.$1=$2"
}
