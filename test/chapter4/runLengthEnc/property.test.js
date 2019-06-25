const { expect } = require('chai')
const fc = require('fast-check')
const { runLengthEnc, runLengthDec } = require('.')

const alphaNumChar =
  fc.base64()
    .filter(c => c !== '+' && c !== '/')

const rleItem =
  fc.integer(1, 20).chain(n =>
    alphaNumChar.map(c => [n, c]))

const rleList = size => {
  if (size <= 1) {
    return rleItem.map(pair => [pair])
  } else {
    return rleList(size - 1).chain(pairs => {
      const [[, c1]] = pairs
      return rleItem
        .filter(([, c2]) => c2 !== c1)
        .map(pair => [pair, ...pairs])
    })
  }
}

const genOutput = fc.integer(0, 100).chain(rleList)

describe('4.6 Constructing optimal output', () => {
  it('round-trip', () => {
    fc.assert(
      fc.property(genOutput, r => {
        expect(runLengthEnc(runLengthDec(r))).to.deep.equal(r)
      }))
  })
})
