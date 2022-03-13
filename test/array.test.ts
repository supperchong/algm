import {
  mergeArray,
  initArray,
  init2Array,
  intersect,
  reverse,
  sortA,
  sortD,
  last,
  push,
  sum,
  max,
  min,
  unique,
} from '../src/array'
import assert from 'assert'

describe('test array', () => {
  it('should init 1 dimension array', () => {
    const arr = initArray([9])

    assert.deepStrictEqual(arr, Array(9).fill(0))
  })
  it('should receive number', () => {
    const arr = initArray(4)
    assert.deepStrictEqual(arr, [0, 0, 0, 0])
  })
  it('should init 2 dimension array', () => {
    const arr = initArray([3, 4])
    assert.strictEqual(arr.length, 3)
    assert.strictEqual(arr[0].length, 4)
    assert.deepStrictEqual(arr, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
  it('element should not correlation', () => {
    const arr = initArray([3, 4])

    arr[0][0] = 1
    assert.strictEqual(arr[1][0], 0)
    assert.strictEqual(arr[2][0], 0)
  })

  it('should init 2 dimension array', () => {
    const arr = init2Array(3, 4)
    assert.deepStrictEqual(arr, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
})
describe('test mergeArray', () => {
  it('should merge all overlapped intervals', () => {
    const result = mergeArray([
      [0, 1],
      [1, 2],
      [3, 4],
    ])
    assert.deepStrictEqual(result, [
      [0, 2],
      [3, 4],
    ])
  })
})
describe('test intersect', () => {
  it('should return the intersection of two array', () => {
    const result = intersect([1, 2], [2, 3])
    assert.deepStrictEqual(result, [2])
  })
})
describe('test reverse', () => {
  it('should reverse the array from start to end', () => {
    const result = reverse([2, 3, 4])
    assert.deepStrictEqual(result, [4, 3, 2])
  })
})
describe('test sortA', () => {
  it('should sort the array in ascending order by the value default', () => {
    const result = sortA([3, 1, 2])
    assert.deepStrictEqual(result, [1, 2, 3])
  })
  it('should sort the array in ascending order by the specified key', () => {
    const result = sortA(
      [{ height: 3 }, { height: 2 }, { height: 1 }],
      x => x.height
    )
    assert.deepStrictEqual(result, [
      { height: 1 },
      { height: 2 },
      { height: 3 },
    ])
  })
  it('should sort the strings', () => {
    const result = sortA(['ca', 'ba', 'bd'])
    assert.deepStrictEqual(result, ['ba', 'bd', 'ca'])
  })
})
describe('test sortD', () => {
  it('should sort the array in descending order by the value default', () => {
    const result = sortD([3, 1, 2])
    assert.deepStrictEqual(result, [3, 2, 1])
  })
  it('should sort the array in descending order by the specified key', () => {
    const result = sortD(
      [{ height: 3 }, { height: 2 }, { height: 1 }],
      x => x.height
    )
    assert.deepStrictEqual(result, [
      { height: 3 },
      { height: 2 },
      { height: 1 },
    ])
  })
  it('should sort the strings', () => {
    const result = sortD(['ca', 'ba', 'bd'])
    assert.deepStrictEqual(result, ['ca', 'bd', 'ba'])
  })
})
describe('test last', () => {
  it('should return the last value', () => {
    assert.strictEqual(last([2, 1, 5]), 5)
  })
})
describe('test push', () => {
  it('should push a value to a property of the object', () => {
    const obj = {}
    push(obj, 'key1', 'a')
    push(obj, 'key1', 'b')
    push(obj, 'key2', 'c')
    assert.deepStrictEqual(obj, { key1: ['a', 'b'], key2: ['c'] })
  })
})
describe('test sum', () => {
  it('should return 0  when the array is empty', () => {
    assert.strictEqual(sum([]), 0)
  })
  it('should return the sum', () => {
    assert.strictEqual(sum([1, 2, 3]), 6)
  })
})

describe('test max', () => {
  it('should return the max value', () => {
    assert.strictEqual(max(1, 3, 2), 3)
  })
  it('should return the max value when length is too large', () => {
    let nums = Array(200000).fill(2)
    nums[0] = 1
    assert.throws(() => Math.max(...nums), RangeError)
    assert.strictEqual(max(nums), 2)
  })
})

describe('test min', () => {
  it('should return the min value', () => {
    assert.strictEqual(min(1, 3, 2), 1)
    assert.strictEqual(min([1, 3, 2]), 1)
  })
  it('should return the min value when length is too large', () => {
    let nums = Array(200000).fill(2)
    nums[0] = 1
    assert.throws(() => Math.min(...nums), RangeError)
    assert.strictEqual(min(nums), 1)
  })
})

describe('test unique', () => {
  it('should return a new arr that does not contains duplicate elements', () => {
    const r = unique([1, 1, 2, 2, 2, 6, 1])
    assert.deepStrictEqual(r, [1, 2, 6])
  })
})
