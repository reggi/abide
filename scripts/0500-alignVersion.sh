USAGE="--alignVersion (updates package.json with latest version in npm)"
function alignVersion {
  NAME=`node -e "console.log(require('./package.json').name)"`
  VERSION=`npm view $NAME version 2> /dev/null`
  if [ -f $VERSION ]; then
    echo "Package not public $NAME"
  else
    echo "Found package $NAME with version $VERSION"
    $1 -Ie "this.version='$VERSION'" -f ./package.json
  fi  
}
