USAGE="--addPropFileAll <prop> <value> (adds a prop to package.json from file to all packages)"

function escapeQuotes () {
  echo $1 | sed -e 's/"/\\&/g'
}

function removeLines () {
  echo $1 | tr "\n" " "
}

function addPropFileAll () {
  file=../../$2
  script='source ../../scripts/9999-import.sh && import && addPropFile '$1' '$file''
  lerna exec -- $script
}
