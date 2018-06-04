import journey from '@reggi/journey'
import {get, take, takeRight, findIndex} from 'lodash'

export const defaultQuery = (prop) => (i, r) => i[prop] === r[prop]
export const updatedRecord = (arr, record, index) => ({...get(arr, index, {}), ...record})

export const upsert = journey((arr, record, query) => [
  () => ({arr, record, query}),
  ({query}) => ({queryFn: (typeof query === 'string') ? defaultQuery(query) : query}),
  ({arr, queryFn}) => ({index: findIndex(arr, (i) => queryFn(i, record))}),
  ({arr, index}) => ({front: take(arr, index)}),
  ({arr, front}) => ({takeRightAmount: arr.length - (front.length + 1)}),
  ({arr, index, takeRightAmount}) => ({back: takeRight(arr, takeRightAmount)}),
  ({arr, index, front, record, back}) => ({return: (index >= 0) ? [...front, updatedRecord(arr, record, index), ...back] : [...arr, record]})
], {return: true})

export default upsert
