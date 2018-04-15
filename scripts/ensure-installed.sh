echo "ensure-installed: command $1"
if [ -x "$(command -v $1)" ]; then
  echo "ensure-installed: global command found $1"
  cmd="$1"
elif [ -f "./node_modules/.bin/$1" ]; then
  echo "ensure-installed: local command found $1"
  cmd="./node_modules/.bin/$1"
else
  echo "ensure-installed: installing command $1 locally using $2"
  npm i $2
  cmd="./node_modules/.bin/$1"
fi
echo "ensure-installed: resolved command $1 to $cmd"
unhyphenated_name=$(echo $1 | tr '-' '_')
declare "${unhyphenated_name}"="$cmd"
export ${unhyphenated_name}
