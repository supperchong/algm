import { sortA } from './array'
/**
 * minimum number of intervals to cover the target interval
 * @category interval
 */
export function minIntervalCover(intervals: number[][]) {
  sortA(intervals, v => v[0])
  if (!intervals.length) {
    return 0
  }
  let c = 1
  let [, right] = intervals[0]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= right) {
      right = Math.max(right, intervals[i][1])
    } else {
      c++
      right = intervals[i][1]
    }
  }
  return c
}

/**
 *
 * @param {number[][]} intervals
 * @category interval
 */
export function maxIntervalDisjoint(intervals: number[][]) {
  sortA(intervals, v => v[1])

  if (!intervals.length) {
    return 0
  }
  let c = 1
  let [, right] = intervals[0]

  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i]
    if (interval[0] > right) {
      c++
      right = interval[1]
    }
  }
  return c
}
/**
 * @category interval
 */
export const medium = (function() {
  let lastValue: any = null
  return function(left: number, right: number) {
    let m = Math.floor((left + right) / 2)
    if (m === lastValue) {
      m = Math.ceil((left + right) / 2)
    }
    lastValue = m
    return m
  }
})()
