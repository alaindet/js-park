/**
 * This implementaion is in between the naive single array one and the linked
 * list one. In comparison with the linked list implementation, this has
 * 
 * - Comparable, slightly slower performance (still 200x better than the single array)
 * - Easier to implement, no manual linked list data structure
 * - Uses more memory since two arrays/stacks are implemented
 * - Best suited for many subsequent enqueues or dequeues
 * - Degrades when frequently cycling enqueue/dequeue with a short queue, since
 *   elements must travel through two arrays
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