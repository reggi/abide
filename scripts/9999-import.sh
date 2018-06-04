# for progamatic export / import of all functions
function import () {
    DIRSCRIPTS="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    FILES="$(find "$DIRSCRIPTS" -type f -name '*.sh' -print)"
    for FILE in $FILES;do
        if [ -f "$FILE" ]; then
            # shellcheck source=/dev/null
            . "$FILE" --source-only
        fi
    done
}
