/**
 * Randomly returns integers in [min, max)
 * @category math
 * @example
 * ```js
 * random(1,2) // => 1
 * random(2,8) // => 4
 * ```
 */
export function random(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(min + Math.random() * (max - min))
}
/**
 * Next bigger permutation
 * @param arr
 * @category math
 * @example
 * ```js
 * nextPermutation([1,2,3,4]) // => [1,2,4,3]
 * nextPermutation([4,3,2,1]) // => [1,2,3,4]
 * ```
 */
export function nextPermutation(arr: number[]) {
  let i = arr.length - 1
  while (i >= 1 && arr[i] <= arr[i - 1]) {
    i--
  }
  if (i === 0) {
    return arr.reverse()
  }
  i--
  let min = arr[i + 1]
  let index: number = i + 1
  for (let j = arr.length - 1; j > i; j--) {
    if (arr[j] > arr[i] && arr[j] < min) {
      min = Math.min(arr[j], min)
      index = j
    }
  }
  ;[arr[i], arr[index]] = [arr[index], arr[i]]
  for (let j = i + 1; j <= Math.floor((i + arr.length) / 2); j++) {
    ;[arr[j], arr[arr.length + i - j]] = [arr[arr.length + i - j], arr[j]]
  }
  return arr
}

/**
 * Get the greatest common divisor of a and b
 * @category math
 * @example
 * ```js
 * gcd(4,2) // => 2
 * gcd(9,6) // => 3
 * ```
 */
export function gcd(a: number, b: number): number {
  if (b === 0) {
    return a
  }
  return gcd(b, a % b)
}
/**
 * The coordinates of the point [x,y] are rotated 90° anticlockwise around [x0,y0]
 * @category math
 * @example
 * ```js
 * rotate90([1,1],[2,2]) // => [1,3]
 * ```
 */
export function rotate90(
  [x, y]: [number, number],
  [x0, y0]: [number, number]
): [number, number] {
  return [x0 + y0 - y, x - x0 + y0]
}

/**
 * The coordinate of the point [x,y] are rotated 90° clockwise around [x0,y0]
 * @category math
 */
export function rotateCw90(
  [x, y]: [number, number],
  [x0, y0]: [number, number]
): [number, number] {
  return [y - y0 + x0, x0 - x + y0]
}

/**
 * Compute the number of permutations c(n,m)=n*(n-1)*...(n-m+1)/(m!)
 * @category math
 * @example
 * ```js
 * c(5,2) // => 10n
 * c(4,2) // => 6n
 * c(5,0) // => 1n
 * ```
 */
export function c(n: number, m: number): bigint {
  if (m === 0) {
    return 1n
  }
  const bm = BigInt(m)
  const bn = BigInt(n)
  let s = 1n
  let s2 = 1n
  for (let i = 0n; i < bm; i++) {
    s *= bn - i
  }
  for (let i = 1n; i <= bm; i++) {
    s2 *= i
  }
  return s / s2
}

/**
 * First compute the number of permutations c(n,m)=n*(n-1)*...(n-m+1)/(m!)
 * Then take the remainder of modulo 10 * * 9 + 7
 * @category math
 * @example
 * ```js
 * cm(5,2) // => 10
 * cm(4,2) // => 6
 * cm(5,0) // => 1
 * ```
 */
export function cm(n: number, m: number) {
  const d = BigInt(10 ** 9 + 7)
  return Number(c(n, m) % d)
}

/**
 * Returns the i th bit of the absolute value of num
 * @example
 * ```js
 * bit(9,1) // => 0
 * bit(4,2) // => 1
 * bit(3,0) // => 1
 * ```
 */
export function bit(num: number, i: number) {
  if (num < 0) num = num * -1

  while (i > 0) {
    num = Math.floor(num / 2)
    i--
  }
  return num % 2
}

/**
 * Get the number of 1 in the binary number
 * @param n the number
 * @example
 * ```js
 * bitCount(0) // => 0
 * bitCount(3) // => 2
 * bitCount(4) // => 1
 * ```
 */
export function bitCount(n: number) {
  let c = 0

  while (n) {
    if (n % 2 === 1) {
      c++
    }

    n = Math.floor(n / 2)
  }

  return c
}

/**
 * Compute the remainder of m mod n.
 * The remainder is greater than or equal to 0.
 * @param m
 * @param n
 * @example
 * ```js
 * mod(2,3) // => 2
 * mod(-2,3) // => 1
 * mod(3,2) // => 1
 * mod(-2,2) // => 0
 * ```
 */
export function mod(m: number, n: number) {
  const remainder = m % n
  if (remainder < 0) {
    return remainder + n
  }
  return remainder
}
