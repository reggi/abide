import {reduce, toPairs, set, get} from 'lodash'

export default ({pkg, overwrite, opt}) => {
  if (!opt) return pkg
  return reduce(toPairs(opt), (acq, pair) => {
    const check = get(acq, pair[0])
    if ((check && overwrite) || !check) return set(acq, pair[0], pair[1])
    return acq
  }, pkg)
}
