import {max, reduce, isArray, includes, each, mapValues, extend, chain, get} from 'lodash'
import {parseArgv, modifiers} from '@reggi/help.parse-argv'
import {journey} from '@reggi/journey'

export const parseFlagOption = journey((flagsOption) => [
  () => ({flagsOption}),
  ({flagsOption}) => ({flagsString: flagsOption.replace(/<.+>|\[.+\]/g, '')}),
  ({flagsString}) => ({flagsString: flagsString.replace(/,|=/g, ' ')}),
  ({flagsString}) => ({flagsString: flagsString.replace(/\s+/g, ' ')}),
  ({flagsString}) => ({flagsString: flagsString.trim()}),
  ({flagsOption}) => ({required: get(flagsOption.match(/<.+>/g), 0, false)}),
  ({flagsOption}) => ({optional: get(flagsOption.match(/\[.+\]/g), 0, false)}),
  ({flagsString}) => ({flags: flagsString.split(' ')}),
  ({flags, required, optional}) => ({return: {flags, required, optional}})
], {return: true})

export const choices = (...choices) => ({value, flag, required}) => {
  if (!required || !value) return false
  const valid = includes(choices, value)
  if (!valid) throw new Error(`${flag}: invalid choice "${value}" please pick [${choices.join(', ')}]`)
  return false
}

export const rename = (name, defaultValue = false) => ({value, flag}) => {
  const _value = (value === false) ? defaultValue : value
  return {[name]: _value}
}

export const pad = (str, width) => {
  const len = Math.max(0, width - str.length)
  return str + Array(len + 1).join(' ')
}

export const template = ({program, description, options, padLength}) => `
Usage: ${program} [options]

  ${description}

  Options:

${options.map(({flagString, desc}) => `    ${pad(flagString, padLength)}${desc}`).join('\n')}
`

export class Program {
  constructor () {
    this.options = []
    return this
  }
  help () {
    const {program, description, options} = this
    const padLength = max(options.map(({flagString}) => flagString)).length + 10
    return template({program, description, options, padLength})
  }
  name (program) {
    this.program = program
    return this
  }
  description (description) {
    this.description = description
    return this
  }
  option (flagString, desc, modifier) {
    this.options.push({flagString, desc, modifier})
    return this
  }
  parse (argv) {
    const flagTypes = chain(this.options)
      .map(({flagString, desc, modifier}) => {
        const {flags, required, optional} = parseFlagOption(flagString)
        if (required || optional) {
          return flags.map(flag => {
            return {[flag]: {type: 'next', required, optional, desc, modifier}}
          })
        } else {
          return flags.map(flag => {
            return {[flag]: {type: 'bool', required, optional, desc, modifier}}
          })
        }
      })
      .flattenDeep()
      .thru((arr) => extend.apply(null, arr))
      .value()

    const specifiers = mapValues(flagTypes, ({type}) => {
      if (type === 'next') return modifiers.anyDash.next
      return modifiers.anyDash.bool
    })
    const flags = parseArgv(argv, {specifiers})

    each(flagTypes, ({type, required, optional}, flag) => {
      if (typeof flags[flag] === 'boolean' && type !== 'bool' && required) {
        throw new Error(`${flag}: missing required value ${required}`)
      }
    })

    const additions = chain(flagTypes)
      .map(({modifier, required, optional, desc}, flag) => {
        const value = flags[flag] || false
        if (typeof modifier === 'string') {
          return {[modifier]: value}
        } else if (typeof modifier === 'function') {
          return modifier({value, flag, required, optional, desc})
        } else if (isArray(modifier)) {
          return reduce(modifier, (acq, fn) => {
            return {...acq, ...fn({value, flag, required, optional, desc})}
          }, {})
        }
        return false
      })
      .without(true)
      .without(false)
      .thru(v => extend.apply(null, v))
      .value()
    this.flags = {...flags, ...additions}
    return this
  }
}

export const program = () => new Program()

export default program
