import {
  c,
  cm,
  gcd,
  random,
  rotate90,
  rotateCw90,
  bit,
  nextPermutation,
  mod,
} from '../src/math'
import assert from 'assert'

describe('test c(n,m)', () => {
  it('should return 1n when m equal 0', () => {
    assert.strictEqual(c(1, 0), 1n)
    assert.strictEqual(c(5, 0), 1n)
  })
  it('should return c(n,m)', () => {
    assert.strictEqual(c(5, 2), 10n)
    assert.strictEqual(c(4, 2), 6n)
  })
  it('should return number', () => {
    assert.strictEqual(cm(5, 2), 10)
    assert.strictEqual(cm(4, 2), 6)
  })
})
describe('test random', () => {
  it('should return random int between start and end', () => {
    assert.strictEqual(random(1, 2), 1)
    const r = random(2, 8)
    assert.strictEqual(r >= 2 && r < 8, true)
  })
})
describe('test gcd', () => {
  it('should return the greatest common divisor of a and b', () => {
    assert.strictEqual(gcd(4, 2), 2)
    assert.strictEqual(gcd(9, 6), 3)
  })
})
describe('test rotate', () => {
  it('should anticlockwise the coordinates', () => {
    assert.deepStrictEqual(rotate90([1, 1], [2, 2]), [3, 1])
  })
  it('should clockwise the coordinates', () => {
    assert.deepStrictEqual(rotateCw90([1, 1], [2, 2]), [1, 3])
  })
})

describe('test bit', () => {
  it('should returns the i th bit of the absolute value of num', () => {
    const data = [
      {
        param: [9, 1],
        result: 0,
      },
      {
        param: [4, 2],
        result: 1,
      },
      {
        param: [3, 0],
        result: 1,
      },
    ]
    data.forEach(({ param, result }) => {
      assert.strictEqual(bit(param[0], param[1]), result)
    })
  })
})
describe('test nextPermutation', () => {
  it('should return the next bigger permutation', () => {
    assert.deepStrictEqual(nextPermutation([1, 2, 3, 4]), [1, 2, 4, 3])
    assert.deepStrictEqual(nextPermutation([4, 3, 2, 1]), [1, 2, 3, 4])
  })
})
describe('test mod', () => {
  it('should return the remainder', () => {
    assert.strictEqual(mod(2, 3), 2)
    assert.strictEqual(mod(3, 2), 1)
    assert.ok(mod(-2, 2) === 0)
  })
  it('the remainder is greater than or equal to 0', () => {
    assert.strictEqual(mod(-2, 3), 1)
  })
})
