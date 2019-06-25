class Expression {
  eval() {
    throw new Error('eval called on Expression')
  }
  show() {
    throw new Error('show called on Expression')
  }
}

class Const extends Expression {
  constructor(n) {
    super()
    this.n = n
  }
  eval() {
    return this.n
  }
  show() {
    return `${this.n}`
  }
  get [Symbol.toStringTag]() {
    return this.show()
  }
}

class Add extends Expression {
  constructor(e1, e2) {
    super()
    this.e1 = e1
    this.e2 = e2
  }
  eval() {
    return this.e1.eval() + this.e2.eval()
  }
  show() {
    return `(${this.e1.show()} + ${this.e2.show()})`
  }
  get [Symbol.toStringTag]() {
    return this.show()
  }
}

class Mul extends Expression {
  constructor(e1, e2) {
    super()
    this.e1 = e1
    this.e2 = e2
  }
  eval() {
    return this.e1.eval() * this.e2.eval()
  }
  show() {
    return `(${this.e1.show()} * ${this.e2.show()})`
  }
  get [Symbol.toStringTag]() {
    return this.show()
  }
}

const rewrite = e => {
  if (e instanceof Mul) {
    if (e.e1 instanceof Const && e.e1.n === 0) return new Const(0)
    return e
  }
  if (e instanceof Add) {
    if (e.e1 instanceof Const && e.e1.n === 1) return e.e2
    return e
  }
  return e
}

module.exports = {
  Const,
  Add,
  Mul,
  rewrite
}
