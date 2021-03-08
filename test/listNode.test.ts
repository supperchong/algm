import assert from 'assert'
import { serialize, deserialize, ListNode } from '../src/listNode'
describe('test serialize', () => {
    it('should return [] if the list is null', () => {
        assert.strictEqual(serialize(null), '[]')
    })
    it('should return the serialize string', () => {
        const node1 = new ListNode(1)
        const node2 = new ListNode(2)
        const node3 = new ListNode(3)

        const node4 = new ListNode(4)
        const node5 = new ListNode(5)
        node1.next = node2
        node2.next = node3
        node3.next = node4
        node4.next = node5
        assert.strictEqual(serialize(node1), '[1,2,3,4,5]')
    })
})

describe('test deserialize', () => {
    it('should return null', () => {
        assert.strictEqual(deserialize('[]'), null)
    })
    it('should return listNode', () => {
        const node1 = deserialize('[1,2,3,4,5]')
        assert.ok(node1)
        const node2 = node1.next
        assert.ok(node2)
        const node3 = node2.next
        assert.ok(node3)
        const node4 = node3.next
        assert.ok(node4)
        const node5 = node4.next
        assert.ok(node5)
        assert.strictEqual(node1.val, 1)
        assert.strictEqual(node2.val, 2)
        assert.strictEqual(node3.val, 3)
        assert.strictEqual(node4.val, 4)
        assert.strictEqual(node5.val, 5)
    })
})
