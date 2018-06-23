USAGE="--gitChanges (throws error code if there are git changes)"
function gitChanges () {
  stderrBanner "gitChanges" "checking if there is changes in the current dir"
  git status --porcelain
  # CHANGED=$(git status --porcelain)
  # if [ -n "${CHANGED}" ]; then
  #   stderrBanner "gitChanges" "found changed files"
  #   exit 1
  # else
  #   stderrBanner "gitChanges" "no changed files"
  #   exit 0
  # fi
}

