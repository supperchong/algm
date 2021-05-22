import assert from 'assert'
import {
  serialize,
  deserialize,
  TreeNode,
  serializeArr,
  deserializeArr,
} from '../src/treeNode'
describe('test serialize', () => {
  it('should return [] if the tree is null', () => {
    assert.strictEqual(serialize(null), '[]')
  })
  it('should return the serialize string', () => {
    const root = new TreeNode(1)
    const left = new TreeNode(2)
    const right = new TreeNode(3)
    root.left = left
    root.right = right
    right.left = new TreeNode(4)
    right.right = new TreeNode(5)
    assert.strictEqual(serialize(root), '[1,2,3,null,null,4,5]')
  })
  it('should serialize arr', () => {
    assert.strictEqual(serializeArr([]), '[]')
    assert.strictEqual(serializeArr([null]), '[[]]')
    const root = new TreeNode(1)
    const left = new TreeNode(2)
    const right = new TreeNode(3)
    root.left = left
    root.right = right
    right.left = new TreeNode(4)
    right.right = new TreeNode(5)
    assert.strictEqual(serializeArr([root]), '[[1,2,3,null,null,4,5]]')
  })
})
describe('test deserialize', () => {
  it('should return null', () => {
    assert.strictEqual(deserialize('[]'), null)
  })
  it('should return treeNode', () => {
    const root = deserialize('[1,2,3,null,null,4,5]')
    assert.ok(root !== null)
    const left = root.left
    const right = root.right
    assert.ok(left !== null)
    assert.ok(right !== null)
    assert.strictEqual(root.val, 1)
    assert.strictEqual(left.val, 2)
    assert.strictEqual(right.val, 3)
    assert.ok(right.left !== null)
    assert.ok(right.right !== null)
    assert.strictEqual(right.left.val, 4)
    assert.strictEqual(right.right.val, 5)
  })
  it('should deserialize arr', () => {
    assert.deepStrictEqual(deserializeArr('[]'), [])
    assert.deepStrictEqual(deserializeArr('[[]]'), [null])
    const [root] = deserializeArr('[[1,2,3,null,null,4,5]]')
    assert.ok(root !== null)
    const left = root.left
    const right = root.right
    assert.ok(left !== null)
    assert.ok(right !== null)
    assert.strictEqual(root.val, 1)
    assert.strictEqual(left.val, 2)
    assert.strictEqual(right.val, 3)
    assert.ok(right.left !== null)
    assert.ok(right.right !== null)
    assert.strictEqual(right.left.val, 4)
    assert.strictEqual(right.right.val, 5)
  })
})
