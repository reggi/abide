USAGE="--ensureInstalledBinModule <cmd> <moduleName> (ensures npm module bin globally or locally is accessable)"
function ensureInstalledBinModule {
  location=""
  stderrBanner "ensureInstalledBinModule" "checking if \"$1\" is installed"
  if [ -x "$(command -v $1)" ]; then
    stderrBanner "ensureInstalledBinModule" "global command for \"$1\" found"
    location=$1
  elif [ -f "./node_modules/.bin/$1" ]; then
    stderrBanner "ensureInstalledBinModule" "local command for \"$1\" found"
    location="./node_modules/.bin/$1"
  else
    stderrBanner "ensureInstalledBinModule" "command \"$1\" not found"
    stderrBanner "ensureInstalledBinModule" "running \"npm i $2\" to install module locally"
    npm i $2
    location="./node_modules/.bin/$1"
  fi
  location_path="$(which "$location")"
  location_path_abs="$(fullpath "$location_path")"
  echo "$location_path_abs"
}
