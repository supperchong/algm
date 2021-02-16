/**
 *   SkipList structure
 *   ---------------
 *  |     head(nil) |
 *  |       |       |
 *  |DoubleListNode | -> head(nil) - QuadListNode - QuadListNode - tail(nil)
 *  |       |       |      |                        |
 *  |DoubleListNode | -> head(nil) - QuadListNode - QuadListNode - tail(nil)
 *  |       |       |
 *  |     tail(nil) |
 *   ---------------
 *          ^
 *          |
 *          |
 *      DoubleList
 *
 *
 */
export class DoubleLinkNode<T> {
  next: DoubleLinkNode<T>
  prev: DoubleLinkNode<T>
  val: QuadList<T>
  constructor(val: QuadList<T>) {
    this.next = this
    this.prev = this
    this.val = val
  }
}
export class DoubleLink<T> {
  nil: DoubleLinkNode<T>
  constructor() {
    const qlList = new QuadList<T>()
    this.nil = new DoubleLinkNode<T>(qlList)
  }
  firstLevel() {
    if (this.nil.next === this.nil) {
      this.insert()
    }
    return this.nil.next
  }
  insert() {
    const ql = new QuadList<T>()
    const node = new DoubleLinkNode(ql)
    this.nil.next.prev = node
    node.next = this.nil.next
    this.nil.next = node
    node.prev = this.nil
    if (node.next !== this.nil) {
      // link the above node and below node
      node.val.nil.below = node.next.val.nil
      node.next.val.nil.above = node.val.nil
    }
    return node
  }
  remove(node: DoubleLinkNode<T>) {
    node.prev = node.next
  }
}
class QuadListNode<T> {
  prev: QuadListNode<T>
  next: QuadListNode<T>
  above: QuadListNode<T> | null
  below: QuadListNode<T> | null
  val: T | undefined
  constructor(val?: T) {
    this.prev = this
    this.next = this
    this.above = null
    this.below = null
    this.val = val
  }
}
class QuadList<T> {
  nil: QuadListNode<T>
  constructor() {
    this.nil = new QuadListNode()
  }
  static insertAboveAfter<T>(
    newNode: QuadListNode<T>,
    belowNode: QuadListNode<T> | null,
    leftNode: QuadListNode<T>
  ) {
    newNode.next = leftNode.next
    leftNode.next.prev = newNode
    leftNode.next = newNode
    if (belowNode) {
      belowNode.above = newNode
    }
    newNode.prev = leftNode
    newNode.below = belowNode
  }
  static remove<T>(node: QuadListNode<T>) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }
}
type GetCompareKey = (a: any) => number
interface Position<T> {
  dlNode: DoubleLinkNode<T>
  qlNode: QuadListNode<T>
}

/**
 * a probabilistic data structure.
 * @category SkipList
 * @description
 * `search`, `insert`, `remove` achieve O(Logn) expected performance.
 * @example
 * ```js
 * const sl = new SkipList()
 * sl.insert(3)
 * sl.insert(1)
 * sl.insert(5)
 * sl.search(1) // => 1
 * ```
 */
export class SkipList<T> {
  dl: DoubleLink<T>
  mapValueKey: GetCompareKey
  constructor(fn: GetCompareKey = x => x) {
    this.dl = new DoubleLink()
    this.mapValueKey = fn
  }
  private _search(
    key: number,
    dlNode: DoubleLinkNode<T> = this.dl.firstLevel(),
    qlNode: QuadListNode<T> = dlNode.val.nil
  ): Position<T> {
    const tail = dlNode.val.nil
    qlNode = qlNode.next
    while (qlNode !== tail && this.mapValueKey(qlNode.val) <= key) {
      qlNode = qlNode.next
    }
    qlNode = qlNode.prev

    if (!qlNode.below) {
      return {
        dlNode,
        qlNode,
      }
    }
    qlNode = qlNode.below
    return this._search(key, dlNode.next, qlNode)
  }
  search(key: number) {
    const { qlNode } = this._search(key)
    if (this.mapValueKey(qlNode.val) === key) {
      return qlNode.val
    }
    return null
  }
  insert(value: T) {
    let { qlNode, dlNode } = this._search(this.mapValueKey(value))
    const newqlNode = new QuadListNode(value)
    QuadList.insertAboveAfter(newqlNode, null, qlNode)
    let belowNode = newqlNode
    while (Math.random() < 0.5) {
      const newqlNode = new QuadListNode(value)
      while (qlNode !== dlNode.val.nil && !qlNode.above) {
        qlNode = qlNode.prev
      }
      if (qlNode === dlNode.val.nil && dlNode.prev === this.dl.nil) {
        dlNode = this.dl.insert()
        qlNode = dlNode.val.nil
      } else {
        if (!qlNode.above) {
          throw new Error('qlNode above must not be null')
        }
        qlNode = qlNode.above
        dlNode = dlNode.prev
      }
      QuadList.insertAboveAfter(newqlNode, belowNode, qlNode)
      belowNode = newqlNode
    }
  }
  min() {
    const tail = this.dl.nil.prev
    return tail.val.nil.next.val
  }
  max() {
    const tail = this.dl.nil.prev
    return tail.val.nil.prev.val
  }
  remove(key: number) {
    let { qlNode } = this._search(key)
    if (this.mapValueKey(qlNode.val) === key) {
      QuadList.remove(qlNode)
      while (qlNode.above) {
        qlNode = qlNode.above
        QuadList.remove(qlNode)
      }
    }
  }
}
