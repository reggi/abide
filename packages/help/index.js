import {omitBy, isUndefined, find, map, max, reduce, isArray, includes, each, chain, get} from 'lodash'
import {parseArgv, modifiers, mergeProperties} from '@reggi/help.parse-argv'
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

export const rename = (name, defaultValue) => ({value, flag}) => {
  const _value = defaultValue || value
  return {[name]: _value}
}

export const pad = (str, width) => {
  const len = Math.max(0, width - str.length)
  return str + Array(len + 1).join(' ')
}

export const template = ({name, usage, description, options, padLength}) => `
Usage: ${name} ${usage}

  ${description}

  Options:

${options.map(({flagString, desc}) => `    ${pad(flagString, padLength)}${desc}`).join('\n')}
`

export class Program {
  constructor () {
    this.options = []
    this._usage = ''
    this._description = ''
    this._name = ''
    return this
  }
  help () {
    const {_name, _description, _usage, options} = this
    const padLength = max(options.map(({flagString}) => flagString)).length + 10
    return template({name: _name, usage: _usage, description: _description, options, padLength})
  }
  name (name) {
    this._name = name
    return this
  }
  description (description) {
    this._description = description
    return this
  }
  usage (usage) {
    this._usage = usage
    return this
  }
  option (flagString, desc, modifier) {
    this.options.push({flagString, desc, modifier})
    return this
  }
  parse (argv) {
    // get options in shape for specifiers
    const defaultSpecifier = ({required, optional}) => {
      if (required || optional) return {specifier: modifiers.anyDash.next, specifierType: 'next'}
      return {specifier: modifiers.anyDash.bool, specifierType: 'bool'}
    }
    let options = this.options
    options = map(options, option => ({...option, ...parseFlagOption(option.flagString)}))
    options = map(options, option => ({...option, ...defaultSpecifier(option)}))
    // get specifiers in shape for parseArgv
    const specifiers = chain(options)
      .map(option => map(option.flags, flag => [flag, option.specifier]))
      .flatten()
      .fromPairs()
      .value()
    // provides flag values
    const flags = parseArgv(argv, {specifiers})
    // throws error for required fields
    each(flags, (value, flag) => {
      const option = find(options, option => includes(option.flags, flag))
      if (option && typeof value === 'boolean' && option.specifierType !== 'bool' && option.required) {
        throw new Error(`${flag}: missing required value ${option.required}`)
      }
    })
    // apply modifiers
    const modifierValues = chain(options)
      .map((option) => map(option.flags, flag => ({flag, ...option})))
      .flatten()
      .map(option => ({...option, value: get(flags, option.flag, undefined)}))
      .map((option) => {
        const {modifier, required, optional, desc, value, flag} = option
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
      .without(false)
      .without(true)
      .map(values => omitBy(values, isUndefined))
      .thru(mergeProperties)
      .value()
    this.parsed = flags
    this.modifiers = modifierValues
    this.flags = {...flags, ...modifierValues}
    return this
  }
}

export const program = () => new Program()

export default program
