import assert from 'assert'
import { UnionFind } from '../src/unionFind'
describe('test UnionFind', () => {
  it('should merge two sets', () => {
    const edges: [number, number][] = [
      [0, 1],
      [1, 2],
    ]
    const uf = new UnionFind(4)
    edges.forEach(edge => {
      uf.union(...edge)
    })
    assert.ok(uf.isSameSet(0, 1))
    assert.ok(uf.isSameSet(0, 2))
    assert.ok(!uf.isSameSet(0, 3))
  })
})
