/**
 * This implementation is easy, but dequeue is slow since Array.prototype.shift
 * moves all the elements of the array each time
 */
export class ArrayQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element) {
    this.elements.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.elements[0];
  }

  size() {
    return this.elements.length;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}
