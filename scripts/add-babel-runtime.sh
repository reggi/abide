json -I -f ./package.json -e 'this.babel.plugins=["transform-runtime", ...this.babel.plugins]'
json -I -f ./package.json -e 'this.dependencies={"babel-runtime": "^6.26.0", ...this.dependencies}'
json -I -f ./package.json -e 'this.devDependencies={"babel-plugin-transform-runtime": "^6.23.0", ...this.devDependencies}'
