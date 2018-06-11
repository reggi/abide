USAGE="--ensureLinkedBinModule <cmd> <modulePath> <moduleName> (ensures npm module bin globally or locally is accessable)"
function ensureLinkedBinModule {
  location=""
  stderrBanner "ensureLinkedBinModule" "checking if \"$1\" is accessable"
  if [ -f "./node_modules/.bin/$1" ]; then
    stderrBanner "ensureLinkedBinModule" "local command for \"$1\" found"
    location="./node_modules/.bin/$1"
  elif [ -x "$(command -v $1)" ]; then
    stderrBanner "ensureLinkedBinModule" "global command for \"$1\" found"
    location=$1
  else
    stderrBanner "ensureLinkedBinModule" "command \"$1\" not found"
    stderrBanner "ensureLinkedBinModule" "running \"npm link --prefx $2\" to link module"
    npm link --prefix "$2" 1>&2
    stderrBanner "ensureLinkedBinModule" "running \"npm link $3\" to link module locally"
    npm link "$3" 1>&2
    location="./node_modules/.bin/$1"
  fi
  location_path="$(which "$location")"
  location_path_abs="$(fullpath "$location_path")"
  echo "$location_path_abs"
}
