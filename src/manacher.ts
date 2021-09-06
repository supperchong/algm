// the typescript implementation of Manacher's linear-time algorithm.
// https://en.wikipedia.org/wiki/Longest_palindromic_substring
// returns an array representing the longest palindrome substring centered around each location

export function getPalindromeArr(str: string) {
  let len = str.length * 2 + 1

  let s: string[] = Array(len).fill('|')
  for (let i = 0; i < str.length; i++) {
    s[2 * i + 1] = str[i]
  }
  let palindromeRadiusArr = Array(len).fill(0)
  let center = 0
  let radius = 0
  while (center < len) {
    while (
      center - (radius + 1) >= 0 &&
      center + (radius + 1) < len &&
      s[center - radius - 1] === s[center + radius + 1]
    ) {
      radius++
    }
    palindromeRadiusArr[center] = radius
    let oldCenter = center
    let oldRadius = radius
    center++
    while (center <= oldCenter + oldRadius) {
      let diff = oldCenter + oldRadius - center
      if (palindromeRadiusArr[oldCenter * 2 - center] === diff) {
        radius = diff
        break
      } else if (palindromeRadiusArr[oldCenter * 2 - center] > diff) {
        palindromeRadiusArr[center] = oldCenter + oldRadius - center
        center++
      } else {
        palindromeRadiusArr[center] =
          palindromeRadiusArr[oldCenter * 2 - center]
        center++
      }
    }
  }
  let originPalindromeRadiusArr = Array(str.length).fill(0)
  for (let i = 0; i < originPalindromeRadiusArr.length; i++) {
    originPalindromeRadiusArr[i] = palindromeRadiusArr[2 * i + 1]
  }
  return originPalindromeRadiusArr
}
