rm -rf ./node_modules
rm -rf ./package-lock.json
lerna exec -- rm -rf package-lock.json
lerna exec -- rm -rf etc
lerna clean --yes
