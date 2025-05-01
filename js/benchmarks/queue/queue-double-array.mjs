/**
 * This implementaion is in between the naive single array one and the linked
 * list one. In comparison with the linked list implementation, this is
 *
 * - Comparable, slightly slower performance (but still 200x faster than single array)
 * - Easier to implement (no manual linked list data structure)
 * - Less memory efficient, since two arrays/stacks are used
 * - Best suited for faster enqueueing and slower dequeueing
 * - Less optimal for short queues, i. e. enqueue/dequeue are almost synchronized,
 *   since elements must jump between two arrays before leaving and this is only
 *   acceptable for bigger queues (faster enqueue, slower dequeue)
 */
export class DoubleArrayQueue {
  constructor() {
    this.inElements = [];
    this.outElements = [];
  }

  enqueue(element) {
    this.inElements.push(element);
  }

  dequeue() {
    this.#transferElements();

    if (this.outElements.length === 0) {
      return null;
    }

    return this.outElements.pop();
  }

  peek() {
    this.#transferElements();

    if (this.outElements.length === 0) {
      return null;
    }

    return this.outElements[0];
  }

  size() {
    return this.inElements.length + this.outElements.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  #transferElements() {
    if (this.inElements.length === 0 || this.outElements.length > 0) {
      return;
    }

    for (let i = 0, len = this.inElements.length; i < len; i++) {
      const element = this.inElements.pop();
      this.outElements.push(element);
    }
  }
}
