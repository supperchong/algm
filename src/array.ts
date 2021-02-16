/**
 * Initializes an array with initial value of 0
 * @return return the new array
 * @category array
 * @example
 * ```js
 * initArray(3) // => [0,0,0]
 * initArray([3,2]) // => [[0,0],[0,0],[0,0]]
 * ```
 */
export function initArray(dimension: number | number[]): any[] {
  if (Number.isInteger(dimension)) {
    return Array(dimension).fill(0)
  }
  if (!Array.isArray(dimension)) {
    throw new Error('dimension sould be int or int array')
  }
  if (dimension.length === 1) {
    let len = dimension[0]
    return Array(len).fill(0)
  }

  let len = dimension[0]
  return Array.from(Array(len), () => [...initArray(dimension.slice(1))])
}
/**
 * Initializes a two-dimensional array
 * @param m
 * @param n
 * @param value the default value of element
 * @category array
 * @return return the new array
 * @example
 * ```js
 * init2Array(2,3) // => [[0,0,0],[0,0,0]]
 * ```
 */
export function init2Array(m: number, n: number, value = 0): number[][] {
  const arr: number[][] = []
  for (let i = 0; i < m; i++) {
    arr[i] = Array(n).fill(value)
  }
  return arr
}

/**
 * merge all overlapped intervals
 * @param intervals
 * @category array
 * @example
 * ```js
 * mergeArray([[0,1],[1,2],[3,4]]) // => [[0,2],[3,4]]
 * ```
 */
export function mergeArray(intervals: number[][]) {
  if (!intervals.length) {
    return []
  }
  intervals.sort((arr1, arr2) => arr1[0] - arr2[0])
  let prev = intervals[0]
  let result = []
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= prev[1]) {
      prev = [prev[0], Math.max(intervals[i][1], prev[1])]
    } else {
      result.push(prev)
      prev = intervals[i]
    }
  }
  result.push(prev)
  return result
}

/**
 * Intersection of two array
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @return {any[]}
 * @category array
 * @example
 * ```js
 * intersect([1,2],[2,3]) // => [2]
 * ```
 */
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr1)
  let result = []

  for (let i = 0; i < arr2.length; i++) {
    const e = arr2[i]
    if (set.has(e)) {
      result.push(e)
    }
  }
  return result
}

/**
 *  the min sum to make array unique by subtracting of the element
 * @param arr an array of int
 * @category array
 * @example
 * ```js
 * countOfUniqueD([3,3,1]) // => 1,the unique array should be [3,2,1], 3->2
 * countOfUniqueD([3,3,3]) // => 3,the unique array should be [3,2,1], 3->2, 3->1
 * ```
 */
export function countOfUniqueD(arr: number[]): number {
  let result = 0
  if (arr.length <= 1) {
    return 0
  }
  sortD(arr)
  let t = arr[0]
  for (let i = 1; i < arr.length; i++) {
    t--
    if (t > arr[i]) {
      t = arr[i]
    } else {
      result += arr[i] - t
    }
  }
  return result
}

/**
 * the min sum to make array unique by increasing the element
 * @param arr an array of int
 * @category array
 * @example
 * ```js
 * countOfUniqueA([1,1,2]) // => 2,the unique array should be [1,2,3]
 * countOfUniqueA([0,2,2,2,3]) // => 5 ,the unique array should be [0,2,3,4,5], 2->4,2->5
 * ```
 */
export function countOfUniqueA(arr: number[]) {
  let result = 0
  if (arr.length <= 1) {
    return 0
  }
  sortA(arr)
  let t = arr[0]
  for (let i = 1; i < arr.length; i++) {
    t++
    if (t < arr[i]) {
      t = arr[i]
    } else {
      result += t - arr[i]
    }
  }
  return result
}

/**
 * reverse the array from start to end
 * @category array
 * @example
 * ```js
 * reverse([2,3,4]) // => [4,3,2]
 * ```
 */
export function reverse<T>(arr: T[], start = 0, end = arr.length - 1): T[] {
  for (let i = start; i < (start + end) / 2; i++) {
    let t = arr[i]
    arr[i] = arr[start + end - i]
    arr[start + end - i] = t
  }
  return arr
}
interface IndexObj<T> {
  index: number
  value: T
}
/**
 * return an index arr
 * @category array
 * @example
 * ```js
 * toIndexArr([1,2,3]) // => [{index:0,value:1},{index:1,value:2},{index:2,value:3}]
 * ```
 */
export function toIndexArr<T>(arr: T[]): IndexObj<T>[] {
  let indexArr: IndexObj<T>[] = []
  for (let i = 0; i < arr.length; i++) {
    indexArr[i] = {
      index: i,
      value: arr[i],
    }
  }
  return indexArr
}

function compare(v1: number | string, v2: number | string) {
  if (typeof v1 !== typeof v2) {
    throw new Error('the type of key should be the same')
  }
  if (typeof v1 !== 'string') {
    return v1 - (v2 as number)
  } else {
    return v1.localeCompare(v2 as string)
  }
}
type GetCompareKey<T> = (a: T) => any
/**
 * Sort the array in ascending order by key
 * @param  arr the array
 * @param  fn return the key to sort, default key is value
 * @param  fn2 if the key is equal, using the second key
 * @category array
 * @example
 * ```js
 * sortA([3,1,2]) // => [1,2,3]
 * sortA([{height:3},{height:2},{height:1}],x=>x.height) // => [{height:1},{height:2},{height:3}]
 * sortA(['ca','ba','bd']) // => ['ba','bd','ca']
 * ```
 */
export function sortA<T>(arr: T[], fn: GetCompareKey<T> = x => x, fn2 = fn) {
  return arr.sort((x, y) => {
    const key1 = fn(x)
    const key2 = fn(y)
    const r = compare(key1, key2)
    if (r) {
      return r
    }
    const key3 = fn2(x)
    const key4 = fn2(y)
    return compare(key3, key4)
  })
}
/**
 * Sort the array in descending order by key
 * will change the origin array
 * @param  arr the array
 * @param  getCompareKey return the key to sort
 * @param  getCompareKey2 if the key is equal, using the second key
 * @category array
 * @example
 * ```js
 * sortD([3,1,2]) // => [3,2,1]
 * sortD([{height:3},{height:2},{height:1}],x=>x.height) // => [{height:3},{height:2},{height:1}]
 * sortD(['ca','ba','bd']) // => ['ca','bd','ba']
 * sortD([{value:1,index:1},{value:2,index:3},{value:2,index:2}],x=>x.value,x=>x.index)
 * // => [{value:2,index:3},{value:2,index:2},{value:1,index:1}]
 * ```
 */
export function sortD<T>(
  arr: T[],
  getCompareKey: GetCompareKey<T> = x => x,
  getCompareKey2 = getCompareKey
) {
  return arr.sort((x, y) => {
    const key1 = getCompareKey(x)
    const key2 = getCompareKey(y)
    const r = compare(key2, key1)
    if (r) {
      return r
    }
    const key3 = getCompareKey2(x)
    const key4 = getCompareKey2(y)
    return compare(key4, key3)
  })
}

/**
 * Return the last value
 * @param arr the array
 * @category array
 * ```js
 * last([2,1,5]) // => 5
 * last([]) // => undefined
 * ```
 */
export function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
interface PlainObj {
  [key: string]: any
}

/**
 * Push a value to a property of the object
 * @example
 * ```js
 * const obj={}
 * push(obj,'key1','a')
 * push(obj,'key1','b')
 * push(obj,'key2','c')
 * console.log(obj) // => {key1:['a','b'],key2:['c']}
 * ```
 */
export function push(obj: PlainObj, key: string | number, item: any) {
  if (!obj[key]) {
    obj[key] = []
  }
  obj[key].push(item)
}
/**
 * Gets a unique key based on the parameter
 * ```js
 * key('abc','bd') // => 'abc#bd'
 * key(['a','b']) // => 'a#b'
 * ```
 */
export function key(
  ...args: (number | string)[] | (number | string)[][]
): string {
  if (Array.isArray(args[0])) {
    return args[0].join('#')
  }
  return args.join('#')
}

/**
 * compute the sum of an array
 * @category array
 * @example
 * ```js
 * sum([1,2,3]) // => 6
 * sum([]) // => 0
 * ```
 */
export function sum(arr: number[]) {
  return arr.reduce((prev, cur) => prev + cur, 0)
}

/**
 * Get the max value
 * @category array
 * @example
 * ```js
 * max(1,3,2) // => 3
 * max([1,3,2]) // => 3
 * ```
 */
export function max(...arg: number[] | number[][]): number {
  if (!Array.isArray(arg[0])) {
    return Math.max(...(arg as number[]))
  }

  arg = arg[0]

  if (arg.length <= 10000) {
    return Math.max(...arg)
  }

  let max = -Infinity

  for (const num of arg) {
    max = Math.max(max, num)
  }

  return max
}

/**
 * Get the min value
 * @category array
 * @example
 * ```js
 * min(1,3,2) // => 1
 * min([1,3,2]) // => 1
 * ```
 */
export function min(...arg: number[] | number[][]): number {
  if (!Array.isArray(arg[0])) {
    return Math.min(...(arg as number[]))
  }

  arg = arg[0]

  if (arg.length <= 10000) {
    return Math.min(...arg)
  }

  let min = -Infinity

  for (const num of arg) {
    min = Math.min(min, num)
  }

  return min
}

/**
 * return a new arr that does not contains duplicate elements.
 * @category array
 * @example
 * ```js
 * unique([1,1,2,2,2,6,1]) //=> [1,2,6]
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}
