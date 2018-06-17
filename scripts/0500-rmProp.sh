USAGE="--rmProp <prop> (removes a prop from the CWD package.json)"
function rmProp () {
  json --in-place -f $PWD/package.json -e "(this.$1) ? delete this.$1 : null"
}
