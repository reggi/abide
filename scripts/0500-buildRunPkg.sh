USAGE="--buildRunPkg <package> (builds then runs a given package)"
function buildRunPkg {
  npm --prefix ./packages/$1 run build && node ./packages/$1 $2
}
