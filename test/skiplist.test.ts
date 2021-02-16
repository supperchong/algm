import { SkipList, DoubleLink } from '../src/skiplist'
import assert from 'assert'
describe('test search', () => {
  it('should add double link node', () => {
    const sl = new SkipList()
    assert.ok(sl.dl.nil === sl.dl.nil.next)
  })
  it('should insert the value', () => {
    const sl = new SkipList()
    sl.insert(3)
    sl.insert(1)
    sl.insert(5)
    const r = sl.search(1)
    assert.strictEqual(r, 1)
  })
  it('should return the min', () => {
    const sl = new SkipList()
    const nums = [7, 1, 5, 3, 8]
    nums.forEach(num => {
      sl.insert(num)
    })
    const r = sl.min()
    assert.strictEqual(r, Math.min(...nums))
  })
  it('should return the max', () => {
    const sl = new SkipList()
    const nums = [7, 1, 5, 3, 8]
    nums.forEach(num => {
      sl.insert(num)
    })
    const r = sl.max()
    assert.strictEqual(r, Math.max(...nums))
  })
  it('should remove the value', () => {
    const sl = new SkipList()
    const nums = [7, 1, 5, 3, 8]
    nums.forEach(num => {
      sl.insert(num)
    })
    sl.remove(8)
    const r = sl.max()
    assert.strictEqual(r, 7)
  })
})
describe('test DoubleLink', () => {
  it('should insert new node', () => {
    const dl = new DoubleLink()
    assert.ok(dl.nil === dl.nil.next)
    dl.insert()
    assert.ok(dl.nil !== dl.nil.next)
  })
})
