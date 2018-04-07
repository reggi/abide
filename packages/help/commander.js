import {max, reduce, isArray, includes, each, mapValues, extend, chain, get} from 'lodash'
import {parseArgv, modifiers} from './index'
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

// chain(parseFlagOption(flags))
//   map()

class Program {
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
        if (!required && !optional) {
          return flags.map(flag => {
            return {[flag]: {type: 'bool', required, optional, desc, modifier}}
          })
        } else if (required || optional) {
          return flags.map(flag => {
            return {[flag]: {type: 'next', required, optional, desc, modifier}}
          })
        }
      })
      .flattenDeep()
      .thru((arr) => extend.apply(null, arr))
      .value()

    const specifiers = mapValues(flagTypes, ({type}) => {
      if (type === 'bool') return modifiers.anyDash.bool
      if (type === 'next') return modifiers.anyDash.next
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
        if (!modifier) return false
        if (typeof modifier === 'string') {
          return {[modifier]: value}
        } else if (typeof modifier === 'function') {
          return modifier({value, flag, required, optional, desc})
        } else if (isArray(modifier)) {
          return reduce(modifier, (acq, fn) => {
            return {...acq, ...fn({value, flag, required, optional, desc})}
          }, {})
        }
      })
      .without(true)
      .without(false)
      .thru(v => extend.apply(null, v))
      .value()
    this.flags = {...flags, ...additions}
    return this
  }
}

const program = new Program()

// console.log(parseFlagOption('-h, --help'))
// console.log(parseFlagOption('--size <size>'))
// console.log(parseFlagOption('--drink [drink]'))
// console.log(parseFlagOption('--size=<size>'))
// console.log(parseFlagOption('--drink=[drink]'))

const choices = (...choices) => ({value, flag, required}) => {
  if (!required || !value) return false
  const valid = includes(choices, value)
  if (!valid) throw new Error(`${flag}: invalid choice "${value}" please pick [${choices.join(', ')}]`)
  return false
}

const rename = (name, defaultValue = false) => ({value, flag}) => {
  const _value = (value === false) ? defaultValue : value
  return {[name]: _value}
}

const pad = (str, width) => {
  const len = Math.max(0, width - str.length)
  return str + Array(len + 1).join(' ')
}

const template = ({program, description, options, padLength}) => `
Usage: ${program} [options]

  ${description}

  Options:

${options.map(({flagString, desc}) => `    ${pad(flagString, padLength)}${desc}`).join('\n')}
`

const tool = program
  .name('pizza-cli')
  .description('The best pizza command-line-interface.')
  .option('-h, --help', 'output usage information', 'help')
  .option('-s, --size <size>', 'size of pizza', [
    choices('large', 'medium', 'small'),
    rename('size', 'small')
  ])
  .option('-v, --veggie [veggie]', 'veggie toppings')
  .option('-m, --meat [meat]', 'meat toppings')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]')
  .parse(process.argv.slice(2))

console.log(tool.help())
