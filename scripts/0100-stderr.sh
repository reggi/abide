USAGE="--stderr <..args> (output to stderr)"
function stderr {
  >&2 echo $@
}
