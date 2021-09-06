import { getPalindromeArr } from '../src/manacher'
import assert from 'assert'

describe('test manacher algorithm', () => {
  it('should return the PalindromeArr', () => {
    const demos = [
      {
        param: 'abcdcabacdm',
        result: [1, 1, 1, 3, 1, 1, 7, 1, 1, 1, 1],
      },
      {
        param: '',
        result: [],
      },
      {
        param: 'aba',
        result: [1, 3, 1],
      },
    ]
    demos.forEach(({ param, result }) => {
      assert.deepStrictEqual(getPalindromeArr(param), result)
    })
  })
})
