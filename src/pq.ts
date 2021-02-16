type GetCompareKey<T> = (a: T) => number

class PQ<T> {
  keys: T[]
  mapValueKey: GetCompareKey<T>
  constructor(keys: T[] = [], fn: GetCompareKey<T> = (x: any) => x) {
    this.keys = [...keys]
    this.mapValueKey = fn

    for (let i = Math.floor((this.keys.length - 2) / 2); i >= 0; i--) {
      this.sink(i)
    }
  }

  insert(key: T) {
    this.keys.push(key)
    this.swim(this.keys.length - 1)
  }

  protected exch(i: number, j: number) {
    ;[this.keys[i], this.keys[j]] = [this.keys[j], this.keys[i]]
  }

  protected less(i: number, j: number) {
    return this.mapValueKey(this.keys[i]) - this.mapValueKey(this.keys[j]) < 0
  }

  protected swim(index: number) {
    let father = Math.floor((index - 1) / 2)

    while (father >= 0 && this.less(father, index)) {
      this.exch(index, father)
      index = father
      father = Math.floor((father - 1) / 2)
    }
  }

  protected sink(index: number) {
    let len = this.keys.length
    let j = index * 2 + 1

    while (j < len) {
      if (j + 1 < len && this.less(j, j + 1)) {
        j++
      }

      if (this.less(index, j)) {
        this.exch(index, j)
        index = j
        j = j * 2 + 1
      } else {
        break
      }
    }
  }

  protected peek() {
    return this.keys[0]
  }

  protected poll() {
    let head = this.peek()
    this.exch(0, this.keys.length - 1)
    this.keys.length = this.keys.length - 1
    this.sink(0)
    return head
  }

  isEmpty() {
    return !this.keys.length
  }

  size() {
    return this.keys.length
  }
}

/**
 * @category priority queue
 * @example
 * ```js
 * const input =  [4, 3, 1]
 * const maxP = new MaxPQ(input)
 * maxP.max() //=> 4
 * maxP.insert(5)
 * maxP.max() //=> 5
 * maxP.insert(8)
 * maxP.max() //=> 8
 * maxP.delMax()
 * maxP.max() //=> 5
 * ```
 * Provide the specified key
 * ```js
 * const input = [{ name: 'xiao', age: 21 }, { name: 'wang', age: 22 }, { name: 'li', age: 25 }]
 * const maxP = new MaxPQ(input, v => v.age)
 * const m = maxP.max() //=> { name: 'li', age: 25 }
 * ```
 *
 */
export class MaxPQ<T> extends PQ<T> {
  max() {
    return this.peek()
  }

  delMax() {
    return this.poll()
  }
}

/**
 * @category priority queue
 * @example
 * ```js
 * const minPQ = new MinPQ([5, 1, 4, 2])
 * minPQ.min() // => 1
 * minPQ.delMin()
 * minPQ.min() // => 2
 * ```
 * Provide the specified key
 * ```js
 * const input = [{ name: 'xiao', age: 21 }, { name: 'wang', age: 22 }, { name: 'li', age: 25 }]
 * const minP = new MinPQ(input, v => v.age)
 * minP.min() // => { name: 'xiao', age: 21 }
 * ```
 */
export class MinPQ<T> extends PQ<T> {
  constructor(keys: T[] = [], fn: GetCompareKey<T> = (x: any) => x) {
    super(keys, x => -1 * fn(x))
  }

  min() {
    return this.peek()
  }

  delMin() {
    return this.poll()
  }
}
