USAGE="--installGlobal <package> installs he package globally"
function installGlobal {
  cd ./packages/$1/ && npm i ./ -g && cd ../..
}
