USAGE="--alignVersionAll (aligns all package versions with what's in npm)"
function alignVersionAll () {
  jsonPath="$(ensureInstalledBinModule "json" "json")"
  lerna exec -- "source ../../scripts/9999-import.sh && import && alignVersion $jsonPath"
}
