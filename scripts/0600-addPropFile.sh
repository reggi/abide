USAGE="--addPropFile <prop> <file> (adds a prop from file to package.json)"
function addPropFile () {
  file=`cat $2`
  addProp $1 $file
}
