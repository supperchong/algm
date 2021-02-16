import { MaxArr, SumArr, ValueArr } from '../src/segment'
import assert from 'assert'
describe('test segment', () => {
  it('should query the max', () => {
    const maxArr = new MaxArr([5, 3, 1])
    const demo = [
      {
        param: [0, 1],
        result: 5,
      },
      {
        param: [1, 2],
        result: 3,
      },
      {
        param: [2, 2],
        result: 1,
      },
    ]
    demo.forEach(({ param, result }) => {
      const m = maxArr.query(...param)
      assert.strictEqual(m, result)
    })
  })
  it('should update value', () => {
    const maxArr = new MaxArr([5, 3, 1])
    maxArr.update(1, 8)
    assert.strictEqual(maxArr.query(0, 2), 8)
    maxArr.update(0, 10)
    assert.strictEqual(maxArr.query(0, 2), 10)
  })
  it('provide the specified key', () => {
    const maxArr = new MaxArr(
      [
        { name: 'li', age: 21 },
        { name: 'wang', age: 24 },
        { name: 'xx', age: 23 },
      ],
      node => node.age
    )
    const demo = [
      {
        param: [0, 1],
        result: { name: 'wang', age: 24 },
      },
      {
        param: [1, 2],
        result: { name: 'wang', age: 24 },
      },
      {
        param: [2, 2],
        result: { name: 'xx', age: 23 },
      },
    ]
    demo.forEach(({ param, result }) => {
      const m = maxArr.query(...param)
      assert.deepStrictEqual(m, result)
    })
    maxArr.update(0, { name: 'xiao', age: 25 })
    assert.deepStrictEqual(maxArr.query(0, 2), { name: 'xiao', age: 25 })
  })
})

describe('test sum segment', () => {
  it('should return sum from 0 to end default', () => {
    const demos = [[-1, 1, 2], [0, 1, 2], [10]]
    demos.forEach(demo => {
      const sum = demo.reduce((prev, cur) => prev + cur)
      let sumArr = new SumArr(demo)
      assert.strictEqual(sumArr.query(), sum)
    })
  })
  it('should return sum from start to end', () => {
    const demos = [
      [-1, 1, 2],
      [0, 1, 2],
      [10, 100],
    ]
    demos.forEach(demo => {
      const sum = demo.slice(1).reduce((prev, cur) => prev + cur)
      let sumArr = new SumArr(demo)
      assert.strictEqual(sumArr.query(1), sum)
    })
  })
  it('should return update sum after updating element', () => {
    const demos = [
      [-1, 1, 2],
      [0, 1, 2],
      [10, 100],
    ]
    demos.forEach(demo => {
      const sum = demo.slice(1).reduce((prev, cur) => prev + cur)
      let sumArr = new SumArr(demo)
      assert.strictEqual(sumArr.query(1), sum)
    })
  })

  it('should return update sum after updating element', () => {
    const demo = [-1, 2, 10]
    let sumArr = new SumArr(demo)
    assert.strictEqual(sumArr.query(0), 11)
    assert.strictEqual(sumArr.query(0, 1), 1)
    sumArr.update(1, 5)
    assert.strictEqual(sumArr.query(0, 1), 4)
    assert.strictEqual(sumArr.query(0), 14)
    sumArr.update(1, 11)
    assert.strictEqual(sumArr.query(0, 1), 10)
    assert.strictEqual(sumArr.query(0), 20)
  })
})
describe('test value segment', () => {
  it('should return the number', () => {
    const arr = [1, 2, 3, 5, 7]
    const vArr = new ValueArr(arr)
    vArr.insert(1)
    vArr.insert(3)
    vArr.insert(5)
    assert.strictEqual(vArr.query(1, 3), 2)
    assert.strictEqual(vArr.query(1, 5), 3)
    vArr.insert(1)
    assert.strictEqual(vArr.query(1, 5), 4)
  })
})
