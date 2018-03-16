json -I -f ./package.json -c 'this.babel.plugins=["transform-runtime", ...this.babel.plugins]'
json -I -f ./package.json -c 'this.dependencies={"babel-runtime": "^6.26.0", ...this.dependencies}'
json -I -f ./package.json -c 'this.devDependencies={"babel-plugin-transform-runtime": "^6.23.0", ...this.devDependencies}'
