USAGE="--packageJestCoverageReporter (fixes the coverage reporter to be just json)"
function packageJestCoverageReporter {
  lerna="$(ensureInstalledBinModule "lerna" "lerna")"
  json="$(ensureInstalledBinModule "json" "json")"
  $lerna exec -- ""$json" -I -e \"this.jest.coverageReporters=['json']\" -f ./package.json"
}
