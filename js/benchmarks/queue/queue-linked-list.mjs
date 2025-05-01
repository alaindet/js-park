class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * This queue is implemented via linked lists. This is generally the best
 * implementation. The array-based implementations are only faster when enqueueing
 * since Array.prototype.push is easier to do than instantiating a new node
 * and update the tail of the list
 */
export class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(data) {
    const newNode = new LinkedListNode(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this._size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const dequeuedNode = this.head;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    this._size--;
    return dequeuedNode.data;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.head.data;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }
}
