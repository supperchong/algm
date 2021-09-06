import { hopcroftKarp } from './hopcroftKarp'
import { max } from './index'
/**
 * Calculate the connectivity degree according to the undirected graph adjacency array.
 * @param {number[][]} adjArr adjacency array
 * @param {number} n vertex number
 * @category Graph
 * @mermaid
 * graph LR
 *   0 --- 4
 *   1 --- 2
 *   2 --- 3
 * @example
 * ```js
 * getConnectedNumByAdjArr([[4],[2],[1,3],[2],[0]]) // => 2
 * ```
 */
export function getConnectedNumByAdjArr(
  adjArr: number[][],
  n: number = adjArr.length
) {
  let set: Set<number> = new Set()
  let num = 0
  for (let i = 0; i < n; i++) {
    if (!set.has(i)) {
      num++
      dfs(i, set, adjArr)
    }
  }
  return num
}
function dfs(node: number, set: Set<number>, adjArr: number[][]) {
  set.add(node)
  const adjNodes: number[] = adjArr[node] || []
  for (let i = 0; i < adjNodes.length; i++) {
    if (!set.has(adjNodes[i])) {
      dfs(adjNodes[i], set, adjArr)
    }
  }
}

/**
 * Calculate the connectivity degree according to the undirected graph adjacency matrix.
 * @category Graph
 * @param {number[][]} adjMatrix 邻接矩阵
 */
export function getConnectedNumByAdjMatrix(adjMatrix: number[][]) {
  let num = 0
  const n = adjMatrix.length
  let set: Set<number> = new Set()
  for (let i = 0; i < n; i++) {
    if (!set.has(i)) {
      num++
      dfs2(i, set, adjMatrix)
    }
  }
  return num
}

function dfs2(index: number, set: Set<number>, isConnected: number[][]) {
  set.add(index)
  for (let j = 0; j < isConnected.length; j++) {
    if (isConnected[index][j] && !set.has(j)) {
      dfs(j, set, isConnected)
    }
  }
}

/**
 * bipartite graph contains two vertex set X and Y
 * Reference:https://en.wikipedia.org/wiki/K%C5%91nig%27s_theorem_(graph_theory)
 * @param m the number of set X
 * @param adjArr the adjacency array of X
 * @param n the number of set Y
 */
export function minCoverVertices(m: number, adjArr: number[][], n?: number) {
  const map = hopcroftKarp(m, adjArr)
  if (n === undefined) {
    n = max(adjArr.map(edge => max(edge))) + 1
  }

  let arr = []
  let set = new Set()
  for (let i = 0; i < m; i++) {
    // find not matched vertex in m
    if (!map.has(i)) {
      set.add(i)
      arr.push(i)
    }
  }
  let isInX = true
  while (arr.length) {
    if (isInX) {
      const copyArr = arr.splice(0)
      copyArr.forEach(x => {
        let adjVertices = adjArr[x]
        for (let i = 0; i < adjVertices.length; i++) {
          let y = adjVertices[i]
          if (!set.has(y)) {
            set.add(y)
            const newX = map.get(y)
            arr.push(newX)
            set.add(newX)
          }
        }
      })
    }
  }
  let coverVertices = []
  for (let i = 0; i < m; i++) {
    if (!set.has(i)) {
      coverVertices.push(i)
    }
  }
  for (let i = m; i < n!; i++) {
    if (set.has(i)) {
      coverVertices.push(i)
    }
  }
  return coverVertices
}
