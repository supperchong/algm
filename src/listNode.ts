export class ListNode<T = number> {
  constructor(
    public val: T | undefined = undefined,
    public next: ListNode<T> | null = null
  ) {}
}
/**
 * Encodes a list to a single string.
 *
 * @mermaid
 * graph LR
 *   1 --- 2
 *   2 --- 3
 *   3 --- 4
 *   4 --- 5
 * @example
 * ```js
 * serialize(root) // => '[1,2,3,4,5]'
 * ```
 */
export function serialize<T = number>(head: ListNode<T> | null): string {
  if (!head) {
    return JSON.stringify([])
  }
  let arr = []
  let node: ListNode<T> | null = head
  while (node) {
    arr.push(node.val)
    node = node.next
  }
  return JSON.stringify(arr)
}

export function serializeArr<T = number>(arr: (ListNode<T> | null)[]): string {
  let out = []
  for (let i = 0; i < arr.length; i++) {
    out.push(serialize(arr[i]))
  }
  return '[' + out.join(',') + ']'
}

/**
 * Decodes your encoded data to list.
 */
export function deserialize<T = number>(
  originData: string
): ListNode<T> | null {
  const data = JSON.parse(originData)
  let header = new ListNode<T>()
  let node = header
  for (let i = 0; i < data.length; i++) {
    node.next = new ListNode(data[i])
    node = node.next
  }
  return header.next
}

export function deserializeArr<T = number>(
  originData: string
): (ListNode<T> | null)[] {
  const arr: T[][] = JSON.parse(originData)
  let out: (ListNode<T> | null)[] = []
  for (let i = 0; i < arr.length; i++) {
    out.push(deserialize(JSON.stringify(arr[i])))
  }
  return out
}
/**
 * reverse a list
 */
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) {
    return null
  }
  let prev = null
  let cur: ListNode<T> | null = head
  while (cur) {
    let next: ListNode<T> | null = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}
