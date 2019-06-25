const { expect } = require('chai')
const fc = require('fast-check')
const { Const, Add, Mul, rewrite } = require('.')

const genExpr =
  fc.integer(1, 50).chain(sz => fc.frequency(
    { weight: sz, arbitrary: genConst },
    { weight: Math.trunc(sz - Math.sqrt(sz)), arbitrary: genAdd },
    { weight: Math.trunc(sz - Math.sqrt(sz)), arbitrary: genMul }
  ))
const genConst = fc.integer(0, 10).map(n => new Const(n))
const genAdd = genExpr.chain(e1 => genExpr.map(e2 => new Add(e1, e2)))
const genMul = genExpr.chain(e1 => genExpr.map(e2 => new Mul(e1, e2)))

describe('6.2 Custom test case simplification', () => {
  it('propRewrite', () => {
    fc.assert(
      fc.property(genExpr, expr => {
        expect(rewrite(expr).eval()).to.equal(expr.eval())
      }))
  })
})
