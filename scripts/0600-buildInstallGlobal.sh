USAGE="--buildInstallGlobal <pkg> | --big <pkg> (builds then installs package globally)"
function buildInstallGlobal {
  stderrBanner "buildInstallGlobal" "$1"
  buildPkg $1
  installGlobal $1
}

function big { buildInstallGlobal $1; }
