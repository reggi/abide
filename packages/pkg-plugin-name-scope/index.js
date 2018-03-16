export default ({pkg, wd, opt}) => ({
  ...pkg,
  name: `${opt}/${pkg.name}`
})
