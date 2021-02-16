interface Options {
  n: number
  edges?: number[][]
  adjArr?: number[][]
}

/**
 * topological sort
 * must provide edges or adjArr
 * @param options
 * @param options.n the number of vertices
 * @param options.edges the edges
 * @param options.adjArr the adjacency arr
 * @category graph
 * @mermaid
 *  flowchart TD
 *    1-->0
 *    1-->3
 *    3-->2
 * 	  3-->4
 * @example
 * ```js
 * topsort({n:5,edges:[[1,0],[1,3],[3,2],[3,4]]}) // => [1,3,4,2,0]
 * topsort({n:3,edges:[[1],[2],[0]]}) // => []
 * ```
 */
export function topsort(options: Options) {
  let { n, edges, adjArr } = options

  if (!adjArr) {
    if (!edges) {
      throw new Error('should provide edges or adjArr')
    }
    adjArr = []
    for (let i = 0; i < n; i++) {
      adjArr[i] = []
    }
    for (const [fromi, toi] of edges) {
      adjArr[fromi].push(toi)
    }
  }
  let c = Array(n).fill(0)
  let arr: number[] = []
  for (let i = 0; i < n; i++) {
    if (!c[i]) {
      if (!dfs(i, c, adjArr, arr)) {
        return []
      }
    }
  }
  return arr.reverse()
}
/**
 *
 * @param node
 * @param c
 * @param adjArr
 * @param arr
 */
function dfs(node: number, c: number[], adjArr: number[][], arr: number[]) {
  c[node] = -1
  const adjNodes = adjArr[node]
  for (let i = 0; i < adjNodes.length; i++) {
    const adjNode = adjNodes[i]
    if (c[adjNode] === -1) {
      return false
    }
    if (!c[adjNode] && !dfs(adjNode, c, adjArr, arr)) {
      return false
    }
  }
  c[node] = 1
  arr.push(node)
  return true
}
