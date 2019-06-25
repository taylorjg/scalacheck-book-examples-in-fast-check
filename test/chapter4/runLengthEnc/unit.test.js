const { expect } = require('chai')
const { runLengthEnc, runLengthDec } = require('.')

describe('Run Length Encoding unit tests', () => {

  it('runLengthEnc basic test', () => {
    const actual = runLengthEnc('AABBBACC')
    const expected = [[2, 'A'], [3, 'B'], [1, 'A'], [2, 'C']]
    expect(actual).to.deep.equal(expected)
  })

  it('runLengthDec basic test', () => {
    const r = [[2, 'A'], [3, 'B'], [1, 'A'], [2, 'C']]
    const chars = runLengthDec(r)
    const actual = chars.join('')
    const expected = 'AABBBACC'
    expect(actual).to.deep.equal(expected)
  })
  
  it('runLengthEnc should be stack safe', () => {
    const count = 1e6
    const decoded = 'AB'.repeat(count)
    const encoded = runLengthEnc(decoded)
    expect(encoded.length).to.equal(count * 2)
  })
})
