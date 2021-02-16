import { sortA, unique } from './array'
interface TreeNode {
  l: number
  r: number
  v: any
}
abstract class SegmentTree<T> {
  tree: TreeNode[]

  constructor(
    protected arr: T[],
    protected getLeafValue: (v: any) => any,
    protected getNotLeafValue: (vl: any, vr: any) => any
  ) {
    const n = arr.length
    this.tree = Array(4 * n)
    this._build(0, 0, n - 1)
  }
  protected _build(u: number, l: number, r: number) {
    if (l === r) {
      this.tree[u] = {
        l,
        r,
        v: this.getLeafValue(this.arr[l]),
      }
      return
    }
    let m = Math.floor((l + r) / 2)
    this._build(2 * u + 1, l, m)
    this._build(2 * u + 2, m + 1, r)
    this.tree[u] = {
      l,
      r,
      v: this.getNotLeafValue(this.tree[2 * u + 1].v, this.tree[2 * u + 2].v),
    }
  }
  protected _update(u: number, pos: number, v: T) {
    const { l, r } = this.tree[u]
    if (pos < l || pos > r) {
      return
    }
    if (l === r) {
      if (l === pos) {
        this.tree[u].v = this.getLeafValue(v)
      }
      return
    }
    let m = Math.floor((l + r) / 2)
    if (pos > m) {
      this._update(2 * u + 2, pos, v)
    } else {
      this._update(2 * u + 1, pos, v)
    }
    this.tree[u].v = this.getNotLeafValue(
      this.tree[2 * u + 1].v,
      this.tree[2 * u + 2].v
    )
  }
  abstract query(start: number, end: number): any
  // abstract update(pos: number, value: T): void
}

/**
 * Max segment tree.
 * Query the maximum value of given range and update the value in O(Logn) time.
 *
 * @category segment tree
 * @example
 * ```js
 * const maxArr = new MaxArr([2,3,1,7,9])
 * const [l,r]=[0,2]
 * // find the maximum value from [l,r]
 * maxArr.query(l,r) //=> 3
 * maxArr.query(0,3) //=> 7
 * maxArr.update(1,9)
 * maxArr.query(0,3) //=> 9
 * ```
 * Provide the specified key
 * ```js
 * const maxArr = new MaxArr([{ name: 'li', age: 21 }, { name: 'wang', age: 24 }, { name: 'xx', age: 23 }],node=>node.age)
 * maxArr.query(0,2) //=> { name: 'wang', age: 24 }
 * maxArr.update(0, { name: 'xiao', age: 25 })
 * maxArr.query(0,2) //=> { name: 'xiao', age: 25 }
 * ```
 */
export class MaxArr<T> extends SegmentTree<T> {
  mapValueKey: (node: T) => number
  constructor(arr: T[], mapValueKey = (x: any) => x) {
    super(
      arr,
      x => x,
      (x, y) => {
        return mapValueKey(x) - mapValueKey(y) >= 0 ? x : y
      }
    )
    this.mapValueKey = mapValueKey
  }
  private _query(u: number, l: number, r: number): T | undefined {
    const { l: _l, r: _r, v } = this.tree[u]
    if (l <= _l && r >= _r) {
      return v
    }
    if (r < _l || l > _r) {
      return
    }
    let v1 = this._query(2 * u + 1, l, r)
    let v2 = this._query(2 * u + 2, l, r)
    if (v1 === undefined) {
      return v2
    } else if (v2 === undefined) {
      return v1
    }
    return this.getNotLeafValue(v1, v2)
  }
  query(start = 0, end = this.arr.length - 1) {
    return this._query(0, start, end)
  }
  update(pos: number, value: T) {
    this.arr[pos] = value
    this._update(0, pos, value)
  }
}

/**
 * Sum segment tree.
 * Query the sum of given range and update the value in O(Logn) time.
 * @category segment tree
 * @example
 * ```js
 * const sumArr = new SumArr([2,3,1,7,9])
 * sumArr.query(0,2)
 * ```
 */
export class SumArr extends SegmentTree<number> {
  constructor(arr: number[]) {
    super(
      arr,
      x => x,
      (x, y) => x + y
    )
  }
  private _query(u: number, l: number, r: number): number {
    const { l: _l, r: _r, v } = this.tree[u]
    if (l <= _l && r >= _r) {
      return v
    }
    if (r < _l || l > _r) {
      return 0
    }
    let v1 = this._query(2 * u + 1, l, r)
    let v2 = this._query(2 * u + 2, l, r)
    return this.getNotLeafValue(v1, v2)
  }
  query(start = 0, end = this.arr.length - 1): number {
    return this._query(0, start, end)
  }
  update(pos: number, value: number) {
    this.arr[pos] = value
    this._update(0, pos, value)
  }
}

/**
 * Given an array contains all the values,
 * insert the value one by one,and
 *  query the number of value in [lower,upper].
 * @category segment tree
 * @example
 * ```js
 * const arr = [1, 2, 3, 5, 7]
 * const vArr = new ValueArr(arr)
 * vArr.insert(1)
 * vArr.insert(3)
 * vArr.insert(5)
 * assert.strictEqual(vArr.query(1, 3), 2)
 * assert.strictEqual(vArr.query(1, 5), 3)
 * vArr.insert(1)
 * assert.strictEqual(vArr.query(1, 5), 4)
 * ```
 */
export class ValueArr extends SegmentTree<number> {
  constructor(arr: number[]) {
    super(
      sortA(unique(arr)),
      () => 0,
      (x, y) => x + y
    )
  }
  private _query(u: number, low: number, upper: number): number {
    const { l, r, v } = this.tree[u]
    const lv = this.arr[l]
    const rv = this.arr[r]
    if (low <= lv && upper >= rv) {
      return v
    } else if (low > rv || upper < lv) {
      return 0
    }
    return (
      this._query(2 * u + 1, low, upper) + this._query(2 * u + 2, low, upper)
    )
  }
  query(low: number, upper: number): number {
    return this._query(0, low, upper)
  }
  private _insert(u: number, v: number) {
    const node = this.tree[u]
    const { l, r } = node
    const lv = this.arr[l]
    const rv = this.arr[r]
    if (lv <= v && rv >= v) {
      node.v++
      if (l < r) {
        this._insert(2 * u + 1, v)
        this._insert(2 * u + 2, v)
      }
    }
  }
  insert(v: number) {
    this._insert(0, v)
  }
}
