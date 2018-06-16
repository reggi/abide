const command = (m, fn, _process = process) => {
  if (require.main === m) {
    return fn(_process)
  } else {
    return fn
  }
}

module.exports = command
