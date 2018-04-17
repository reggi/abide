# @reggi/help

```js
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
```
