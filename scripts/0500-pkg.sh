USAGE="--pkg <package> (creates a package.json file in a given dir using the cobalt plugin)"
function pkg {
  cd ./packages/$1
  node ../pkg-cli/index.build.js --plugin=../pkg-plugin-cobalt -w
}
