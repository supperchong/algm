import assert from 'assert'
import { topsort } from '../src/topsort'
describe('test topsort', () => {
  it('should return the topsort w', () => {
    const r = topsort({
      n: 5,
      edges: [
        [1, 0],
        [1, 3],
        [3, 2],
        [3, 4],
      ],
    })
    assert.deepStrictEqual(r, [1, 3, 4, 2, 0])
  })
  it('should return the topsort when provide adjArr ', () => {
    const r = topsort({ n: 5, adjArr: [[], [0, 3], [], [2, 4], []] })
    assert.deepStrictEqual(r, [1, 3, 4, 2, 0])
  })
  it('should return empty array when exist ring', () => {
    const r = topsort({
      n: 3,
      edges: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    })
    assert.deepStrictEqual(r, [])
  })
  it('should return empty array when exist ring', () => {
    const r = topsort({ n: 3, adjArr: [[1], [2], [0]] })
    assert.deepStrictEqual(r, [])
  })
})
