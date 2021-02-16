/**
 * @category Union-find data structure
 * @example
 * ```js
 * const uf=new UnionFind(4);
 * uf.union(0, 1);
 * uf.union(1, 2);
 * uf.isSameSet(0, 2); //=> true
 * ```
 */
export class UnionFind {
  size: number
  fatherMap: number[]
  sizeMap: number[]
  /**
   * @param n the  number of node
   */
  constructor(n: number) {
    this.fatherMap = Array(n).fill(-1)
    this.sizeMap = Array(n).fill(1)
    this.size = n
  }
  /**
   * find set representatives use `path compression`
   * @param node
   */
  find(node: number): number {
    if (this.fatherMap[node] === -1) {
      return node
    }
    this.fatherMap[node] = this.find(this.fatherMap[node])
    return this.fatherMap[node]
  }
  isSameSet(node1: number, node2: number): boolean {
    const root1 = this.find(node1)
    const root2 = this.find(node2)
    return root1 === root2
  }
  /**
   * merge two sets
   * @param node1
   * @param node2
   */
  union(node1: number, node2: number): void {
    const root1 = this.find(node1)
    const root2 = this.find(node2)
    if (root1 === root2) {
      return
    }
    if (this.sizeMap[root1] > this.sizeMap[root2]) {
      this.fatherMap[root2] = root1
      this.sizeMap[root2] = this.sizeMap[root2] + this.sizeMap[root1]
    } else {
      this.fatherMap[root1] = root2
      this.sizeMap[root1] = this.sizeMap[root2] + this.sizeMap[root1]
    }
  }
}
