class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * This queue is implemented via linked lists. It required more code, but it's
 * faster than the implementation via an array
 */
export class LinkedListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this._size = 0;
  }

  enqueue(data) {
    const newNode = new LinkedListNode(data);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this._size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const dequeuedNode = this.front;
    this.front = this.front.next;

    if (this.front === null) {
      this.rear = null;
    }

    this._size--;
    return dequeuedNode.data;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.front.data;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }
}
