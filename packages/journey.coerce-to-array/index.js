import {isArray} from 'lodash'
export const coerceToArray = (v) => isArray(v) ? v : [v]
export default coerceToArray
