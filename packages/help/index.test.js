import help, {Program, parseFlagOption, choices, rename} from './index'

test('help() should be instance of program', () => {
  expect(help()).toBeInstanceOf(Program)
})

test('should be general case', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-h, --help', 'output usage information', 'help')
    .option('-s, --size <size>', 'size of pizza', [
      choices('large', 'medium', 'small'),
      rename('size', 'small')
    ])
    .option('-v, --veggie [veggie]', 'veggie toppings')
    .option('-m, --meat [meat]', 'meat toppings', [
      choices('pepperoni', 'sausage'),
      rename('meat')
    ])
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]')
    .parse([])
  expect(tool.flags.help).toEqual(undefined)
  expect(tool.flags.size).toEqual('small')
  expect(tool.flags.meat).toEqual(undefined)
  expect(typeof tool.help()).toEqual('string')
})

test('should meat to be false', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-m, --meat <meat>', 'meat toppings', [
      choices('pepperoni', 'sausage'),
      rename('meat')
    ])
    .parse([])
  expect(tool.flags.meat).toEqual(undefined)
})

test('should meat value be required', () => {
  expect(() => {
    help()
      .name('pizza-cli')
      .description('The best pizza command-line-interface.')
      .option('-m, --meat <meat>', 'meat toppings', [
        choices('pepperoni', 'sausage'),
        rename('meat')
      ])
      .parse(['--meat'])
  }).toThrow()
})

test('should meat value invalid value required', () => {
  expect(() => {
    help()
      .name('pizza-cli')
      .description('The best pizza command-line-interface.')
      .option('-m, --meat <meat>', 'meat toppings', [
        choices('pepperoni', 'sausage'),
        rename('meat')
      ])
      .parse(['--meat', 'spinach'])
  }).toThrow()
})

test('should use fn modifier', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-m, --meat <meat>', 'meat toppings', rename('meat'))
    .parse(['--meat', 'spinach'])
  expect(tool.flags.meat).toEqual('spinach')
})

test('should meat value valid required', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-m, --meat <meat>', 'meat toppings', [
      choices('pepperoni', 'sausage'),
      rename('meat')
    ])
    .parse(['--meat', 'sausage'])
  expect(tool.flags.meat).toEqual('sausage')
})

test('should have pineapple with --pineapple', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-p, --pineapple', 'add pineapple', 'pineapple')
    .parse(['--pineapple'])
  expect(tool.flags.pineapple).toEqual(true)
})

test('should have pineapple with -p', () => {
  const tool = help()
    .name('pizza-cli')
    .description('The best pizza command-line-interface.')
    .option('-p, --pineapple', 'add pineapple', 'pineapple')
    .parse(['-p'])
  expect(tool.flags.pineapple).toEqual(true)
})

test('parseFlagOption', () => {
  expect(parseFlagOption('-h,--help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('-h    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('  -h,    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('  -h --help ')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
})
