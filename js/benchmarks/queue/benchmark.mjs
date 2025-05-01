import { ArrayQueue } from './queue-array.mjs';
import { DoubleArrayQueue } from './queue-double-array.mjs';
import { LinkedListQueue } from './queue-linked-list.mjs';
import { compareBenchmarks } from './utils.mjs';

main(); // <-- Start here

function main() {
  const LIMIT = 100_000;

  const arrayQueue = new ArrayQueue();
  const doubleArrayQueue = new DoubleArrayQueue();
  const linkedListQueue = new LinkedListQueue();

  enqueueBenchmarks(LIMIT, arrayQueue, doubleArrayQueue, linkedListQueue);
  dequeueBenchmarks(LIMIT, arrayQueue, doubleArrayQueue, linkedListQueue);
  shortQueueBechmarks(LIMIT, arrayQueue, doubleArrayQueue, linkedListQueue);

  /* Outputs
  enqueue
  DoubleArrayQueue        4.283ms 1x             
  ArrayQueue      6.350ms 1.48x
  LinkedListQueue 11.829ms        2.76x

  dequeue
  LinkedListQueue 2.736ms 1x
  DoubleArrayQueue        6.352ms 2.32x
  ArrayQueue      1878.223ms      686.59x       

  enqueue/dequeue short queues
  LinkedListQueue 6.941ms 1x
  DoubleArrayQueue        7.067ms 1.02x
  ArrayQueue      18.559ms        2.67x
  */
}

function enqueueBenchmarks(limit, arrayQueue, doubleArrayQueue, linkedListQueue) {
  console.log('\nenqueue');
  compareBenchmarks([
    {
      name: 'ArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          arrayQueue.enqueue(i);
        }
      },
    },
    {
      name: 'DoubleArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          doubleArrayQueue.enqueue(i);
        }
      },
    },
    {
      name: 'LinkedListQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          linkedListQueue.enqueue(i);
        }
      },
    },
  ]);
}

function dequeueBenchmarks(limit, arrayQueue, doubleArrayQueue, linkedListQueue) {
  console.log('\ndequeue');
  compareBenchmarks([
    {
      name: 'ArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          arrayQueue.dequeue(i);
        }
      },
    },
    {
      name: 'DoubleArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          doubleArrayQueue.dequeue(i);
        }
      },
    },
    {
      name: 'LinkedListQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          linkedListQueue.dequeue(i);
        }
      },
    },
  ]);
}

function shortQueueBechmarks(limit, arrayQueue, doubleArrayQueue, linkedListQueue) {
  console.log('\nenqueue/dequeue short queues');
  compareBenchmarks([
    {
      name: 'ArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          arrayQueue.enqueue(i);
          arrayQueue.enqueue(i);
          arrayQueue.enqueue(i);
          arrayQueue.enqueue(i);
          arrayQueue.dequeue(i);
          arrayQueue.dequeue(i);
          arrayQueue.dequeue(i);
          arrayQueue.dequeue(i);
        }
      },
    },
    {
      name: 'DoubleArrayQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          doubleArrayQueue.enqueue(i);
          doubleArrayQueue.enqueue(i);
          doubleArrayQueue.enqueue(i);
          doubleArrayQueue.enqueue(i);
          doubleArrayQueue.dequeue(i);
          doubleArrayQueue.dequeue(i);
          doubleArrayQueue.dequeue(i);
          doubleArrayQueue.dequeue(i);
        }
      },
    },
    {
      name: 'LinkedListQueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          linkedListQueue.enqueue(i);
          linkedListQueue.enqueue(i);
          linkedListQueue.enqueue(i);
          linkedListQueue.enqueue(i);
          linkedListQueue.dequeue(i);
          linkedListQueue.dequeue(i);
          linkedListQueue.dequeue(i);
          linkedListQueue.dequeue(i);
        }
      },
    },
  ]);
}