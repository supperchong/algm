import { random } from './math'
class RBSTNode<T> {
  size = 1
  constructor(
    public val: T,
    public left: RBSTNode<T> | null = null,
    public right: RBSTNode<T> | null = null
  ) {}
}
type GetCompareKey = (a: any) => number
/**
 * @category randomized binary search tree.
 * @description
 * a randomized binary search tree.
 * `search`, `insert`, `remove`, `find the k-th max value` achieve O(Logn) expected performance.
 * @example
 * ```js
 * const rbst = new RBST()
 * const arr=[1,7,3]
 * arr.forEach(v=>{
 *  rbst.insert(v)
 * })
 * rbst.search(3) // => 3
 * rbst.findKMax(1) // => 7
 * rbst.remove(3)
 * rbst.findKMax(2) // => 1
 *
 * ```
 */
export class RBST<T> {
  root: RBSTNode<T> | null = null
  mapValueKey: GetCompareKey
  constructor(fn: GetCompareKey = x => x) {
    this.mapValueKey = fn
  }
  /**
   * Insert the item as the root of the tree.
   * @param item
   * @param tree
   */
  private insertAsRoot(item: T, tree: RBSTNode<T> | null): RBSTNode<T> {
    if (!tree) {
      return new RBSTNode(item)
    }
    const size = tree.size + 1
    const key = this.mapValueKey(item)
    const [left, right] = this.split(key, tree)
    const newNode = new RBSTNode(item, left, right)
    newNode.size = size
    return newNode
  }
  /**
   * Divide the tree into two parts :leftTree and rightTree.
   * The leftTree key is less than the specified key,
   * and the rightTree key is greater than the specified key.
   * @param key
   * @param tree
   */
  private split(
    key: number,
    tree: RBSTNode<T> | null
  ): [RBSTNode<T> | null, RBSTNode<T> | null] {
    if (!tree) {
      return [null, null]
    }
    if (this.mapValueKey(tree.val) > key) {
      let [leftTree, rightTree] = this.split(key, tree.left)
      tree.left = rightTree
      tree.size -= leftTree ? leftTree.size : 0
      return [leftTree, tree]
    } else {
      let [leftTree, rightTree] = this.split(key, tree.right)
      tree.right = leftTree
      tree.size -= rightTree ? rightTree.size : 0
      return [tree, rightTree]
    }
  }
  /**
   * merge the leftTree and rightTree into one tree.
   * @param leftTree
   * @param rightTree
   */
  private join(
    leftTree: RBSTNode<T> | null,
    rightTree: RBSTNode<T> | null
  ): RBSTNode<T> | null {
    const m = leftTree ? leftTree.size : 0
    const n = rightTree ? rightTree.size : 0
    const total = m + n
    if (!total) return null
    const r = random(0, n + m)
    if (r < m) {
      leftTree!.right = this.join(leftTree!.right, rightTree)
      leftTree!.size = total
      return leftTree
    } else {
      rightTree!.left = this.join(leftTree, rightTree!.left)
      rightTree!.size = total
      return rightTree
    }
  }
  private _insert(item: T, tree: RBSTNode<T> | null) {
    if (!tree) {
      return this.insertAsRoot(item, tree)
    }
    const n = tree.size
    const r = random(0, n + 1)
    if (r === n) {
      return this.insertAsRoot(item, tree)
    } else if (this.mapValueKey(item) < this.mapValueKey(tree.val)) {
      tree.left = this._insert(item, tree.left)
    } else {
      tree.right = this._insert(item, tree.right)
    }
    tree.size++
    return tree
  }
  insert(item: T) {
    this.root = this._insert(item, this.root)
  }

  search(key: number) {
    let tree: RBSTNode<T> | null = this.root
    while (tree) {
      const curKey = this.mapValueKey(tree.val)
      if (key === curKey) {
        return tree.val
      } else if (key < curKey) {
        tree = tree.left
      } else {
        tree = tree.right
      }
    }
    return null
  }
  remove(key: number) {
    if (this.search(key) === null) {
      return
    }
    let tree: RBSTNode<T> | null = this.root
    let father = null
    let p
    while (tree) {
      const curKey = this.mapValueKey(tree.val)
      if (key === curKey) {
        if (!father) {
          this.root = this.join(tree.left, tree.right)
        } else {
          const newTree = this.join(tree.left, tree.right)
          father[p as 'left' | 'right'] = newTree
        }
        return
      } else if (key < curKey) {
        father = tree
        p = 'left'
        tree.size--
        tree = tree.left
      } else {
        father = tree
        p = 'right'
        tree.size--
        tree = tree.right
      }
    }
    return null
  }
  /**
   * find the k-th max item
   * @param k
   */
  findKMax(k: number) {
    const root = this.root
    if (!root) return null
    const size = root.size
    k = size + 1 - k
    if (k > size) {
      return null
    }
    let tree: RBSTNode<T> | null = root
    let prevNum = 0
    while (tree) {
      const leftSize = tree.left?.size || 0
      const curRank = prevNum + leftSize + 1
      if (k === curRank) {
        return tree.val
      } else if (k < curRank) {
        tree = tree.left
      } else {
        prevNum = curRank
        tree = tree.right
      }
    }
    return null
  }
}
