const T = require('../../tiny-trampoline')

const runLengthEnc = xs => {
  const loop = (iter, tuples = [], currTuple = undefined) => {
    const { value, done } = iter.next()
    if (done) {
      currTuple && tuples.push(currTuple)
      return T.done(tuples)
    }
    if (currTuple) {
      const [count, previousValue] = currTuple
      return value === previousValue
        ? T.recurse(() => loop(iter, tuples, [count + 1, value]))
        : T.recurse(() => loop(iter, (tuples.push(currTuple), tuples), [1, value]))
    } else {
      return T.recurse(() => loop(iter, tuples, [1, value]))
    }
  }
  const iter = xs[Symbol.iterator]()
  const trampolinedLoop = T.trampoline(loop)
  return trampolinedLoop(iter)
}

const runLengthDec = r => {
  const generator = function* () {
    for (const [n, x] of r) yield* Array(n).fill(x)
  }
  return Array.from(generator())
}

module.exports = {
  runLengthEnc,
  runLengthDec
}
