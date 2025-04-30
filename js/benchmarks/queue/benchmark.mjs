import { ArrayQueue } from './queue-array.mjs';
import { LinkedListQueue } from './queue-linked-list.mjs';
import { compareBenchmarks } from './utils.mjs';

main(); // <-- Start here

function main() {
  const LIMIT = 100_000;

  const arrayQueue = new ArrayQueue();
  const linkedListQueue = new LinkedListQueue();
  enqueueBenchmarks(LIMIT, arrayQueue, linkedListQueue);
  dequeueBenchmarks(LIMIT, arrayQueue, linkedListQueue);

  /* Outputs

  enqueue
  ArrayQueue.enqueue      6.213ms 1x
  LinkedListQueue.enqueue 11.495ms        1.85x

  dequeue
  LinkedListQueue.dequeue 4.116ms 1x
  ArrayQueue.dequeue      1372.174ms      333.41x
  */
}

function enqueueBenchmarks(limit, arrayQueue, linkedListQueue) {
  console.log('\nenqueue');
  compareBenchmarks([
    {
      name: 'ArrayQueue.enqueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          arrayQueue.enqueue(i);
        }
      },
    },
    {
      name: 'LinkedListQueue.enqueue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          linkedListQueue.enqueue(i);
        }
      },
    },
  ]);
}

function dequeueBenchmarks(limit, arrayQueue, linkedListQueue) {
  console.log('\ndequeue');
  compareBenchmarks([
    {
      name: 'ArrayQueue.dequeue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          arrayQueue.dequeue(i);
        }
      },
    },
    {
      name: 'LinkedListQueue.dequeue',
      benchmark: () => {
        for (let i = 0; i < limit; i++) {
          linkedListQueue.dequeue(i);
        }
      },
    },
  ]);
}
