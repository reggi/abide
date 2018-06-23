USAGE="--gitChanges (throws error code if there are git changes)"
function gitChanges () {
  git status --porcelain
  git diff
  CHANGED=$(git status --porcelain)
  if [ -n "${CHANGED}" ]; then
    exit 1
  else
    exit 0
  fi
}

