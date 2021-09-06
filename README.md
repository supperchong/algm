# algm

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![ci][ci-image]][ci-url]

[npm-image]: https://img.shields.io/npm/v/algm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/algm
[download-image]: https://img.shields.io/npm/dm/algm.svg?style=flat-square
[download-url]: https://npmjs.org/package/algm
[ci-image]: https://github.com/supperchong/algm/workflows/CI/badge.svg
[ci-url]: https://github.com/supperchong/algm/workflows/CI/badge.svg

A fast algorithm library for JavaScript/TypeScript.

## Problem

When you participate in an algorithm competition or code algorithm problems online such as leetcode, you may choose c++,java,python. Because they have the built-in library like STL that contains priority queue,order set etc.

## Installation

```sh
npm install algm
```

## Documentation

You can find the algm documentation [on the website](https://algm.dev).

## Why algm?

### Safe

```js
import a from 'algm';
const arr = Array(125625).fill(0);
//Maximum call stack size exceeded in nodejs
Math.max(...arr);
//safe
a.max(arr);

// the recursive version postorder traversal may result in maximum call stack error
// a.postorder internal use iteration
a.postorder(root, (node, fatherNode) => {
  console.log(node);
});
```

### Contains many frequently used functions

```js
import a from 'algm';
// init an array with an initial value of 0
a.initArray(4); // => [0,0,0,0]

// init a two-dimensional array with an initial value of 0
a.init2Array(3, 4); // => [[0,0,0,0],[0,0,0,0],[0,0,0,0]]

// get the max value
a.max(1, 3, 2); // => 3
a.max([1, 3, 2]); // => 3

// get the min value
a.min(1, 3, 2); // => 1
a.min([1, 3, 2]); // => 1

// compute the sum of an array
a.sum([1, 2, 3]); // => 6

// get the last element of an array
a.last([3, 2, 1]); // => 1

// return a new arr that does not contains duplicate elements.
a.unique([1, 1, 2, 2, 2, 6, 1]); //=> [1,2,6]

// sort the array in ascending order
a.sortA([3, 1, 2]); // => [1, 2, 3]
a.sortA([{ height: 3 }, { height: 2 }, { height: 1 }], x => x.height);
// => [{ height: 1 }, { height: 2 }, { height: 3 }]

a.sortD([3, 1, 2]); // => [3, 2, 1]
a.sortD([{ height: 3 }, { height: 2 }, { height: 1 }], x => x.height);
// => [{ height: 3 }, { height: 2 }, { height: 1 }]

// compute the greatest common divisor of a and b
a.gcd(4, 2); // => 2
a.gcd(9, 6); // => 3

// Randomly returns integers in [min, max)
a.random(2, 8); // => 4

// Compute the number of permutations c(n,m)=n*(n-1)*...(n-m+1)/(m!)
// the result is bigint
a.c(5, 2); // => 10n
a.c(5, 0); // => 1n

// Compute the number of permutations,
// then take the remainder of modulo 10 * * 9 + 7
a.cm(5, 2); // => 10
a.cm(5, 0); // => 1

// Compute the remainder of m mod n
// The main difference with m%n is that a.mod always return nonnegative number.
a.mod(2, 3); // => 2
a.mod(-2, 3); // => 1
-2 % 3; // => -2
a.mod(-2, 2); // => 0
```

### data structure

- `priority queue`

  **max priority queue**

  ```js
  const input = [4, 3, 1];
  const maxP = new MaxPQ(input);
  maxP.max(); //=> 4
  maxP.insert(5);
  maxP.max(); //=> 5
  maxP.insert(8);
  maxP.max(); //=> 8
  maxP.delMax();
  maxP.max(); //=> 5
  ```

  Provide the specified key

  ```js
  const input = [
    { name: 'xiao', age: 21 },
    { name: 'wang', age: 22 },
    { name: 'li', age: 25 },
  ];
  const maxP = new MaxPQ(input, v => v.age);
  const m = maxP.max(); //=> { name: 'li', age: 25 }
  ```

- `SkipList`

  **a probabilistic data structure**

  `search`, `insert`, `remove` achieve O(Logn) expected performance.
  `max`,`min` cost O(1) time complexity

  ```js
  const sl = new SkipList();
  sl.insert(3);
  sl.insert(1);
  sl.insert(5);
  sl.search(1); // => 1
  sl.remove(1);
  sl.search(1); // => null
  ```

- `randomized binary search tree`

  `search`, `insert`, `remove`, `find the k-th max value` achieve O(Logn) expected performance.

  ```js
  const rbst = new RBST();
  const arr = [1, 7, 3];
  arr.forEach(v => {
    rbst.insert(v);
  });
  rbst.search(3); // => 3
  rbst.findKMax(1); // => 7
  rbst.remove(3);
  rbst.search(3); // => null
  rbst.findKMax(2); // => 1
  ```

* `Segment tree`

  **Max segment tree**

  Query the maximum value of given range and update the value in O(Logn) time.

  ```js
  import { MaxArr } from 'algm';
  const maxArr = new MaxArr([2, 3, 1, 7, 9]);
  const [l, r] = [0, 2];
  // find the maximum value from [l,r]
  maxArr.query(l, r); //=> 3
  maxArr.query(0, 3); //=> 7
  maxArr.update(1, 9); // arr=[2, 9, 1, 7, 9]
  maxArr.query(0, 3); //=> 9
  ```

  Provide the specified key

  ```js
  import { MaxArr } from 'algm';
  const maxArr = new MaxArr(
    [
      { name: 'li', age: 21 },
      { name: 'wang', age: 24 },
      { name: 'xx', age: 23 },
    ],
    node => node.age
  );
  maxArr.query(0, 2); //=> { name: 'wang', age: 24 }
  maxArr.update(0, { name: 'xiao', age: 25 });
  maxArr.query(0, 2); //=> { name: 'xiao', age: 25 }
  ```

  **sum segment tree**

  Query the sum of given range and update the value in O(Logn) time.

  ```js
  import { SumArr } from 'algm';
  const sumArr = new SumArr([2, 3, 1, 7, 9]);
  sumArr.query(0, 2); //=> 6
  sumArr.update(2, 4);
  sumArr.query(0, 2); //=> 9
  ```

  **value segment tree**

  Given an array contains all the values,insert the value one by one,and query the number of value in [lower,upper].

  ```js
  import { ValueArr } from 'algm';
  const arr = [1, 2, 3, 5, 7];
  const vArr = new ValueArr(arr);
  vArr.insert(1);
  vArr.insert(3);
  vArr.insert(5);
  assert.strictEqual(vArr.query(1, 5), 3);
  vArr.insert(1);
  assert.strictEqual(vArr.query(1, 5), 4);
  ```

- `union–find`

  A data structure that stores a collection of disjoint (non-overlapping) sets.
  It provides operations for merging sets (union), and finding a representative member(find) of a set.

  ```js
  import { UnionFind } from 'algm';
  const n = 4;
  const uf = new UnionFind(n);
  uf.union(0, 1);
  uf.union(1, 2);
  uf.isSameSet(0, 2); //=> true
  uf.isSameSet(0, 3); //=> false
  ```

### algorithm

- `topsort`

  ```js
  topsort({
    n: 5,
    edges: [
      [1, 0],
      [1, 3],
      [3, 2],
      [3, 4],
    ],
  }); // => [1,3,4,2,0]
  ```

- `Hopcroft–Karp algorithm`

  a fast bipartite matching algorithms

  ```js
  hopcroftKarp(5, [
    [5, 6],
    [5, 9],
    [7, 8],
    [5, 9],
    [6, 8],
  ]);
  // => Map(10){ 0=>6,1=>9,2=>7,3=>5,4=>8,6=>0,7=>2,8=>4,9=>1 }
  ```

- `manacher`
  a linear time algorithm to find all the palindromic substring
  
```js
  import { getPalindromeArr } from 'algm';
  const  palindromeLengthArr=getPalindromeArr('aba')
  // The length of the palindrome centered on each vertex
  // => [1,3,1]
```