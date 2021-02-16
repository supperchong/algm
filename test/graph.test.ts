import assert from 'assert'
import { getConnectedNumByAdjArr } from '../src'
describe('test getConnectedNumByAdjArr', () => {
  it('should return connected number', () => {
    const r = getConnectedNumByAdjArr([[4], [2], [1, 3], [2], [0]])
    assert.strictEqual(r, 2)
  })
})
