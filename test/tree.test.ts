import { inorder, postorder, prevorder } from '../src/tree'
import { deserialize, TreeNode } from '../src/treeNode'
import assert from 'assert'

describe('test postorder', () => {
  it('should traversal in post-order', () => {
    const tree = ['B', 'A', 'D', null, null, 'C', 'E']
    const expects = ['A', 'C', 'E', 'D', 'B']
    let result: string[] = []
    postorder(
      deserialize(JSON.stringify(tree)) as TreeNode<string>,
      (node: TreeNode<string>) => {
        result.push(node.val)
      }
    )
    assert.deepStrictEqual(expects, result)
  })
})
describe('test inorder', () => {
  it('should traversal in in-order', () => {
    const tree = ['B', 'A', 'D', null, null, 'C', 'E']
    const expects = ['A', 'B', 'C', 'D', 'E']
    let result: string[] = []
    inorder(
      deserialize(JSON.stringify(tree)) as TreeNode<string>,
      (node: TreeNode<string>) => {
        result.push(node.val)
      }
    )
    assert.deepStrictEqual(expects, result)
  })
})
describe('test preorder', () => {
  it('should traversal in pre-order', () => {
    const tree = ['B', 'A', 'D', null, null, 'C', 'E']
    const expects = ['B', 'A', 'D', 'C', 'E']
    let result: string[] = []
    prevorder(
      deserialize(JSON.stringify(tree)) as TreeNode<string>,
      (node: TreeNode<string>) => {
        result.push(node.val)
      }
    )
    assert.deepStrictEqual(expects, result)
  })
})
