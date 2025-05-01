/**
 * This implementation is easy, but dequeueing is very slow since
 * Array.prototype.shift moves all the elements of the array each time before
 * shifting (removing the oldest element)
 */
export class SingleArrayQueue {
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
