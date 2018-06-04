USAGE="--fullpath (get the fullpath of a relative path)"
# https://stackoverflow.com/a/31605674/340688
function fullpath () {
  echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"
}
