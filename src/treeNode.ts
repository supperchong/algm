export class TreeNode<T> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

/**
 * Encodes a tree to a single string.
 *
 * @mermaid
 * graph LR
 *   1 --- 2
 *   1 --- 3
 *   3 --- 4
 *   3 --- 5
 * @example
 * ```js
 * serialize(root) // => '[1,2,3,null,null,4,5]'
 * ```
 */
function serialize<T = number>(root: TreeNode<T> | null): string {
  if (!root) {
    return JSON.stringify([])
  }
  let arr: (T | null)[] = []
  let queue: (TreeNode<T> | null)[] = [root]
  while (queue.length) {
    let node = queue.shift()
    if (node) {
      arr.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      arr.push(null)
    }
  }
  let i = arr.length - 1
  while (arr[i] === null) {
    i--
  }
  arr.length = i + 1
  return JSON.stringify(arr)
}

/**
 * Decodes your encoded data to tree.
 */
function deserialize<T = number>(originData: string): TreeNode<T> | null {
  const data = JSON.parse(originData)
  if (!data.length) {
    return null
  }
  let val = data.shift() as T
  let root = new TreeNode(val)
  let queue: TreeNode<T>[] = [root]
  while (queue.length) {
    let node = queue.shift() as TreeNode<T>
    let leftVal = data.shift()
    if (leftVal === undefined) {
      return root
    }
    if (leftVal !== null) {
      let left = new TreeNode(leftVal)
      node.left = left
      queue.push(left)
    }
    let rightVal = data.shift()
    if (rightVal === undefined) {
      return root
    }
    if (rightVal !== null) {
      let right = new TreeNode(rightVal)
      node.right = right
      queue.push(right)
    }
  }
  return root
}

export { serialize, deserialize }
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
