import { last } from './array'
import { TreeNode } from './treeNode'

/**
 * The traversalFn will be executed in post-order
 * @param root
 * @param traversalFn
 * @category tree traversal
 * @mermaid
 *  flowchart TD
 *    B-->A
 *    B-->D
 *    D-->C
 * 	  D-->E
 * @example
 * ```js
 * postorder(root,(node,fatherNode)=>{console.log(node)})
 * // => A C E D B
 * ```
 */
export function postorder<T>(
  root: TreeNode<T>,
  fn1: (node: TreeNode<T>) => any
) {
  if (!root) {
    return
  }
  let map = new Map()
  let queue = [root]
  while (queue.length) {
    let top = last(queue)
    if (!map.get(top)) {
      map.set(top, true)
      if (top.right) {
        queue.push(top.right)
      }
      if (top.left) {
        queue.push(top.left)
      }
    } else {
      queue.pop()
      fn1(top)
    }
  }
}

/**
 * The traversalFn will be executed in in-order
 * @param root
 * @param traversalFn
 * @category tree traversal
 * @mermaid
 *  flowchart TD
 *    B-->A
 *    B-->D
 *    D-->C
 * 	  D-->E
 * @example
 * ```js
 * inorder(root,(node,fatherNode)=>{console.log(node)})
 * // => A B C D E
 * ```
 */
export function inorder<T>(root: TreeNode<T>, fn1: (node: TreeNode<T>) => any) {
  if (!root) {
    return
  }
  let map = new Map()
  let queue = [root]
  while (queue.length) {
    let top = last(queue)
    if (!map.get(top)) {
      map.set(top, true)
      if (top.left) {
        queue.push(top.left)
      }
    } else {
      queue.pop()
      fn1(top)
      if (top.right) {
        queue.push(top.right)
      }
    }
  }
}

/**
 * The traversalFn will be executed in pre-order
 * @param root
 * @param traversalFn
 * @category tree traversal
 * @mermaid
 *  flowchart TD
 *    B-->A
 *    B-->D
 *    D-->C
 * 	  D-->E
 * @example
 * ```js
 * prevorder(root,(node,fatherNode)=>{console.log(node)})
 * // => B A D C E
 * ```
 */
export function prevorder<T>(
  root: TreeNode<T>,
  traversalFn: (node: TreeNode<T>, fatherNode: TreeNode<T> | null) => any
) {
  if (!root) {
    return
  }
  let queue = [root]
  let fatherMap = new Map()
  fatherMap.set(root, null)
  while (queue.length) {
    let top = queue.pop() as TreeNode<T>
    traversalFn(top, fatherMap.get(top))

    if (top.right) {
      fatherMap.set(top.right, top)
      queue.push(top.right)
    }
    if (top.left) {
      fatherMap.set(top.left, top)
      queue.push(top.left)
    }
  }
}
