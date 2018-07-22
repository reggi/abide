# `@reggi/help`

```
npm i @reggi/help --save
```

## Summary

A `process.argv` parser and `--help` generator heavily inspired by `minimist` and `commander`.

## Example

Uses the [`help.parse-argv`](https://github.com/reggi/abide/tree/master/packages/help.parse-argv) module to parse argument variables

```js
import help from '@reggi/help'

const cli = help()
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
  .parse(process.argv)

console.log(cli.flags)
```
