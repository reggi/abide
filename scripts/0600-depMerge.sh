USAGE="--depMerge (ensures lerna and dep-merge are avail, runs within each package)"
function depMerge () {
  stderrBanner "depMerge" "(resolving dependencies)"
  depMergePath="$(ensureLinkedBinModule "dep-merge" "./packages/dep-merge-cli" "@reggi/dep-merge-cli")"
  stderrBanner "depMerge" "(depMerge path \""$depMergePath"\")"
  lernaPath="$(ensureInstalledBinModule "lerna" "lerna")"
  stderrBanner "depMerge" "(lerna path ""$lernaPath"")"
  stderrBanner "depMerge" "(running dep-merge within each package)"
  $lernaPath exec -- ""$depMergePath" --merge --path ./"
}
