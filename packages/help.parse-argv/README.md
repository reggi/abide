# `help.parse-argv`

Modular approach to tools like `minimist` takes in `process.argv` returns object of parsed key values based on unix flag conventions.

Other argv parsers are opinionated. For instance does you're application need to handle `-h`, `--h`, `-H`, and `--H` all differently? `minimist` does not allow this level of granularity, and does absorb the original values in a case like this. `help.parse-argv` is different in that it allows ANY possible combination of flag discovery and any convention. The main difference is that rather then returning an object of flags resovled as `{help: "value"}` it includes the dashes `{"--help": "value"}` offering greater control to remove the dashes later.

For instance:

* `npm run -- {capture}` esque support with the `child.rest` modifier.
* `nodemon --exec {capture}` esque support with the `doubleDash.until` modifier.
* Resolve `-max` as `[{'-m': true, '-a': true, '-x': true}]` accessable booleans with the `multiDash.spread` modifier.

It is also fully extensible and accepts any plugin functions!

This module also allows you to declare specific ways of handling a given regular express match, so you can handle a given flag differently then the others.

Here's a list of default modifiers:

```json
[
  "child.rest",
  "doubleDash.no",
  "doubleDash.equal",
  "doubleDash.next",
  "doubleDash.bool",
  "onlyDash.bool",
  "multiDash.spread"
]
```

Here's a list of all the modifiers:

```js
[
  'anyDash.bool'
  'anyDash.equal'
  'anyDash.next'
  'anyDash.until'
  'onlyDash.bool'
  'onlyDash.equal'
  'onlyDash.next'
  'onlyDash.until'
  'multiDash.bool'
  'multiDash.equal'
  'multiDash.next'
  'multiDash.until'
  'multiDash.spread'
  'dash.bool'
  'dash.equal'
  'dash.next'
  'dash.until'
  'doubleDash.bool'
  'doubleDash.equal'
  'doubleDash.next'
  'doubleDash.until'
  'doubleDash.no'
  'child.rest'
]
```
