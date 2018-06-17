USAGE="--addPropAll <prop> <value> (adds a prop to package.json)"
function addPropAll () {
  lerna exec -- 'source ../../scripts/9999-import.sh && import && addProp '$1' '$2''
}
