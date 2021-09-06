import assert from 'assert'
import { getConnectedNumByAdjArr, minCoverVertices } from '../src'
describe('test getConnectedNumByAdjArr', () => {
  it('should return connected number', () => {
    const r = getConnectedNumByAdjArr([[4], [2], [1, 3], [2], [0]])
    assert.strictEqual(r, 2)
  })
})

describe('test min vertex cover', () => {
  it('the number of cover vertex must equal the maximum matching', () => {
    const adjArr = [[4], [3, 5], [4]]
    const m = 3
    const arr = minCoverVertices(m, adjArr)
    assert.deepStrictEqual(arr, [1, 4])
  })
})
