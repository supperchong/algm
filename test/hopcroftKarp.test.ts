import { hopcroftKarp } from '../src/hopcroftKarp'
import assert from 'assert'
describe('test Hopcroft–Karp algorithm', () => {
  it('should return empty map', () => {
    const r = hopcroftKarp(0, [])
    assert.strictEqual(r.size, 0)
  })
  it('should return the maximum matching', () => {
    const adjArr = [
      [5, 6],
      [5, 9],
      [7, 8],
      [5, 9],
      [6, 8],
    ]
    const m = 5
    const r = hopcroftKarp(m, adjArr)
    const match = {
      0: 6,
      1: 9,
      2: 7,
      3: 5,
      4: 8,
    }

    Object.keys(match).forEach(nodeStr => {
      const node = parseInt(nodeStr) as keyof typeof match
      const matchNode = match[node]
      assert.strictEqual(matchNode, r.get(node))
    })
  })
})
