import {reduce, toPairs, set} from 'lodash'

export default ({pkg, opt}) => {
  if (!opt) return pkg
  return reduce(toPairs(opt), (acq, pair) => {
    return set(acq, pair[0], pair[1])
  }, pkg)
}
