export default ({pkg, wd, opt}) => {
  if (!pkg.name) throw new Error('missing name')
  const ogName = pkg.name
  const splitName = ogName.split('/')
  const name = (splitName.length >= 2) ? splitName[1] : ogName
  return {
    ...pkg,
    name: `${opt}/${name}`
  }
}
