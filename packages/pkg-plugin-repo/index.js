export default ({pkg, opt}) => {
  if (!opt.prefix) throw new Error('missing prefix')
  if (!opt.type) throw new Error('missing type')
  const splitPackage = pkg.name.split('/')
  const repoName = splitPackage[1] || splitPackage[0]
  const url = `${opt.prefix}${repoName}`
  return {
    ...pkg,
    repository: {
      type: opt.type,
      url
    }
  }
}
