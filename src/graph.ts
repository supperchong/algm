/**
 * 根据无向图邻接数组求连通度
 * @param {number[][]} adjArr 邻接数组
 * @param {number} n 顶点个数
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
 * 根据无向图邻接矩阵求连通度
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

interface NodeMap {
  [key: number]: number
}
interface Mark {
  [key: number]: boolean
}
// 匈牙利二分匹配
/**
 * 	hungarian
 * 	bipartite graph contains two vertex set X and Y
 * 	@category Graph
 *	@param m the number of X
 */
export function hungarian(m: number, adj: number[][]) {
  //
  let map: NodeMap = {}
  for (let i = 0; i < m; i++) {
    if (!Number.isInteger(map[i])) {
      let markd: Mark = {}
      dfs3(i, markd, adj, map)
    }
  }
  return map
}

function dfs3(
  node: number,
  markd: Mark,
  adj: number[][],
  map: NodeMap
): boolean {
  markd[node] = true
  for (const adjNode of adj[node]) {
    if (markd[adjNode]) {
      continue
    }
    markd[adjNode] = true
    if (
      !Number.isInteger(map[adjNode]) ||
      dfs3(map[adjNode], markd, adj, map)
    ) {
      map[node] = adjNode
      map[adjNode] = node
      return true
    }
  }
  return false
}

// /**
//  * bipartite matching algorithms
//  *
//  * the [Hopcroft–Karp algorithm](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm) is an algorithm that takes as input a bipartite graph and produces as output a maximum cardinality matching
//  *
//  * bipartite graph contains two vertex set X and Y
//  * @param m the number of X
//  * @param adj the adjacency array
//  */
// export function hopcroftKarp(m: number, adjArr: number[][]) {

// }
// function dfs4() {

// }

// function bfs4() {

// }
