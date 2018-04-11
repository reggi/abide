import {filter} from 'lodash'

export const filterUntil = (arr, matchFn = () => false) => {
  var match = false
  return filter(arr, (...args) => {
    if (match) return false
    const isMatch = matchFn(...args)
    if (isMatch) match = true
    if (match) return false
    return true
  })
}

export default filterUntil
