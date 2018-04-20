const command = (m, fn) => {
  if (require.main === m) {
    return fn(process)
  } else {
    return fn
  }
}

module.exports = command
