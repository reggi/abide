USAGE="--jest <package> (tests a given package)"
function jest {
  jest --projects=./packages/$1
}
