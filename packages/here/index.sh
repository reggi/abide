#!/usr/bin/env bash

# define variables
# DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR="$PWD"
DIRSCRIPTS="$DIR/scripts"
FILES="$(find "$DIRSCRIPTS" -type f -name '*.sh' -print)"
TUSAGE="\\n"
HELP=false
FNPREFIX=''

# loop over script files
for FILE in $FILES;do
    if [ -f "$FILE" ]; then
        # shellcheck source=/dev/null
        . "$FILE" --source-only
        if [ ! -z "$USAGE" ]; then
            TUSAGE="$TUSAGE\\t$USAGE\\n"
            USAGE=""
        fi
    fi
done

# add help to end of usage
TUSAGE="$TUSAGE\\t--help (shows this help output)\\n"

# some internal functions
function namespaceShowUsage () {
  echo "Usage: --function <args> [--function <args>]"
  echo "$TUSAGE"
  exit 0
}

function namespaceRmDash () {
    echo "$1" | tr -d -
}

function namespaceUpperCase () {
    echo "$(echo "${1:0:1}" | tr '[:lower:]' '[:upper:]')${1:1}"
}

# loop over all arguments
CMD=""
REST=false
for ARG in "$@"; do
    if [[ "$ARG" = '--help' ]] || [[ "$ARG" = '-h' ]] || [[ "$ARG" = '--h' ]] || [[ "$ARG" = '-help' ]]; then
        HELP=true
    elif [[ "$ARG" = "--" ]]; then
        REST=true
    elif [[ "$REST" = true ]]; then
        CMD="$CMD \"$ARG\""
    elif [[ "$ARG" = --* ]] || [[ "$ARG" = -* ]]; then
        if [ -z "$FNPREFIX" ]; then
          FUNCTION="$(namespaceRmDash "$ARG")"
        else
          FUNCTION=$FNPREFIX"$(namespaceUpperCase "$(namespaceRmDash "$ARG")")"
        fi
        if [ ! -z "$CMD" ]; then
            CMD="$CMD &&"
        fi
        CMD="$CMD $FUNCTION"
    else
        CMD="$CMD \"$ARG\""
    fi
done

# execute something
if [[ "$HELP" = true ]]; then
    namespaceShowUsage
elif [ ! -z "$CMD" ]; then
    eval "$CMD"
    exit 0
else
    namespaceShowUsage
fi
