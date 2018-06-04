USAGE="--depUnMerge (ensures lerna and dep-merge are avail, unmerges within each package)"
function depUnMerge () {
  stderrBanner "depUnMerge" "(resolving dependencies)"
  depMergePath="$(ensureInstalledBinModule "dep-merge" "file:packages/dep-merge-cli")"
  stderrBanner "depUnMerge" "(depUnMerge path \""$depMergePath"\")"
  lernaPath="$(ensureInstalledBinModule "lerna" "lerna")"
  stderrBanner "depUnMerge" "(lerna path \""$lernaPath"\")"
  stderrBanner "depUnMerge" "(running dep-merge within each package)"
  $lernaPath exec -- ""$depMergePath" --unmerge --path ./"
}
