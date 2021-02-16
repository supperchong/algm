import { RBST } from '../src/rbst'
import assert from 'assert'
describe('test RBST', () => {
  it('should insert value', () => {
    const rbst = new RBST()
    const arr = [1, 3, 7]
    arr.forEach(v => {
      rbst.insert(v)
    })

    arr.forEach(v => {
      assert.strictEqual(rbst.search(v), v)
    })

    assert.strictEqual(rbst.search(2), null)
  })
  it('should remove value', () => {
    const rbst = new RBST()
    const arr = [1, 7, 3]
    arr.forEach(v => {
      rbst.insert(v)
    })
    assert.strictEqual(rbst.search(3), 3)
    assert.strictEqual(rbst.findKMax(1), 7)
    rbst.remove(3)
    assert.strictEqual(rbst.search(3), null)
    assert.strictEqual(rbst.findKMax(2), 1)
  })
  it('should return the k-th max value', () => {
    const rbst = new RBST()
    const arr = [9, 1, 3, 6, 8]
    const brr = [...arr].sort((x, y) => y - x)
    arr.forEach(v => {
      rbst.insert(v)
    })
    brr.forEach((v, i) => {
      assert.strictEqual(rbst.findKMax(i + 1), v)
    })
  })
})
