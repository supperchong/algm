import assert from 'assert'
import { MaxPQ, MinPQ } from '../src/pq'
describe('test MaxPQ', () => {
  it('should return max', () => {
    const input = [4, 3, 1, 8, 0, 1]
    const maxP = new MaxPQ(input)
    const result = [
      maxP.delMax(),
      maxP.delMax(),
      maxP.delMax(),
      maxP.delMax(),
      maxP.delMax(),
      maxP.delMax(),
    ]
    assert.deepStrictEqual(
      result,
      input.sort((x, y) => y - x)
    )
  })
  it('should del and insert element', () => {
    const input = [4, 3, 1]
    const maxP = new MaxPQ(input)
    assert.strictEqual(maxP.max(), 4)
    maxP.insert(5)
    assert.strictEqual(maxP.max(), 5)
    maxP.insert(8)
    assert.strictEqual(maxP.max(), 8)
    assert.strictEqual(maxP.delMax(), 8)
    assert.strictEqual(maxP.max(), 5)
    const result = [maxP.delMax(), maxP.delMax(), maxP.delMax(), maxP.delMax()]
    assert.deepStrictEqual(result, [5, 4, 3, 1])
  })
  it('provide the specified key', () => {
    const input = [
      { name: 'xiao', age: 21 },
      { name: 'wang', age: 22 },
      { name: 'li', age: 25 },
    ]
    const maxP = new MaxPQ(input, v => v.age)
    const m = maxP.max()
    assert.deepStrictEqual(m, { name: 'li', age: 25 })
  })
})
describe('test MinPQ', () => {
  it('should return min', () => {
    const minPQ = new MinPQ([5, 1, 4, 2])
    assert.strictEqual(minPQ.min(), 1)
  })
  it('should insert value', () => {
    const minPQ = new MinPQ()
    minPQ.insert(2)
    minPQ.insert(5)
    assert.strictEqual(minPQ.min(), 2)
  })
  it('should remove the min', () => {
    const minPQ = new MinPQ([5, 1, 4, 2])
    minPQ.delMin()
    assert.strictEqual(minPQ.min(), 2)
  })
  it('provide the specified key', () => {
    const input = [
      { name: 'xiao', age: 21 },
      { name: 'wang', age: 22 },
      { name: 'li', age: 25 },
    ]
    const minP = new MinPQ(input, v => v.age)
    const m = minP.min()
    assert.deepStrictEqual(m, { name: 'xiao', age: 21 })
  })
})
