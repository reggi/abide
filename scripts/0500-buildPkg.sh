USAGE="--buildPkg <package> (builds the given package)"
function buildPkg {
  npm --prefix ./packages/$1 run build
}
