USAGE="--gitUndoPermission (undo changes to permissions)"
function gitUndoPermission {
  git diff -p -R --no-color \
    | grep -E "^(diff|(old|new) mode)" --color=never  \
    | git apply
}
