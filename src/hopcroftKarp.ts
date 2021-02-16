/**
 * check if the value is `undefined`
 */
function isNil(value: any): value is undefined {
  return value === undefined
}
interface DistMap {
  [key: string]: number
}
/**
 * bipartite matching algorithms
 *
 * the [Hopcroft–Karp algorithm](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm) is an algorithm that takes as input a bipartite graph and produces as output a maximum cardinality matching
 *
 * bipartite graph contains two vertex set X and Y
 * @param m the number of X
 * @param adj the adjacency array of X
 * @category Graph
 * @example
 * ```js
 * hopcroftKarp(5,[[5, 6], [5, 9], [7, 8], [5, 9], [6, 8]])
 * // => Map(10){ 0=>6,1=>9,2=>7,3=>5,4=>8,6=>0,7=>2,8=>4,9=>1 }
 * ```
 */
export function hopcroftKarp(m: number, adjArr: number[][]) {
  // record the matching vertices
  let map = new Map<number, number>()
  let dist: DistMap = {}
  while (bfs(map, dist, m, adjArr)) {
    // dfs stage
    for (let i = 0; i < m; i++) {
      // the augmenting-path start from a unmatched vertice
      if (!map.has(i)) {
        dfs(i, map, dist, m, adjArr)
      }
    }
  }
  return map
}
/**
 * compute the shortest distance of all the vertices in X
 * @param map record the matching vertices
 * @param dist the distance map of the vertices in X
 * @param m the number of X
 * @param adjArr the adjacency array of X
 */
function bfs(
  map: Map<number, number>,
  dist: DistMap,
  m: number,
  adjArr: number[][]
) {
  let queue: number[] = []
  // record the shortest length of augmenting-path
  // in fact the shortest length is shortDis*2-1
  let shortDis = Infinity
  // init the distance of vertices in every bfs stage
  // the distance is 0 when the vertice do not match, or that is Infinity
  for (let i = 0; i < m; i++) {
    if (!map.has(i)) {
      dist[i] = 0
      queue.push(i)
    } else {
      dist[i] = Infinity
    }
  }

  while (queue.length) {
    const node = queue.shift()!
    // this ensure all the augmenting-path length in the next dfs stage equal shortDis
    if (dist[node] >= shortDis) {
      break
    }
    const adjNodes = adjArr[node]
    for (let i = 0; i < adjNodes.length; i++) {
      const adjNode = adjNodes[i]
      const nextNode = map.get(adjNode)
      if (isNil(nextNode)) {
        // find a augmenting-path
        shortDis = dist[node] + 1
      } else if (dist[nextNode] === Infinity) {
        dist[nextNode] = dist[node] + 1
        queue.push(nextNode)
      }
    }
  }
  return shortDis < Infinity
}
function dfs(
  node: number,
  map: Map<number, number>,
  dist: DistMap,
  m: number,
  adjArr: number[][]
): boolean {
  const adjNodes = adjArr[node]
  for (let i = 0; i < adjNodes.length; i++) {
    const adjNode = adjNodes[i]
    const nextNode = map.get(adjNode)
    //find a augmenting-path
    if (isNil(nextNode)) {
      map.set(node, adjNode)
      map.set(adjNode, node)
      return true
    } else if (dist[nextNode] === dist[node] + 1) {
      if (dfs(nextNode, map, dist, m, adjArr)) {
        map.set(node, adjNode)
        map.set(adjNode, node)
        return true
      }
    }
  }
  // mark this vertice has fail,so is will not visit in current dfs stage
  dist[node] = Infinity
  return false
}
