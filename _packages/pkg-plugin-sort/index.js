const sortPackageJson = require('sort-package-json')

export default ({pkg}) => {
  return sortPackageJson(pkg)
}
