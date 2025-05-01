import { SingleArrayQueue } from './queue-single-array.mjs';
import { DoubleArrayQueue } from './queue-double-array.mjs';
import { LinkedListQueue } from './queue-linked-list.mjs';
import { compareBenchmarks, createBenchmark } from './utils.mjs';

main(); // <-- Start here

function main() {
  const LIMIT = 200_000;

  const queues = {
    singleArray: new SingleArrayQueue(),
    doubleArray: new DoubleArrayQueue(),
    linkedList: new LinkedListQueue(),
  };

  enqueueBenchmarks(LIMIT, queues);
  dequeueBenchmarks(LIMIT, queues);
  shortQueueBechmarks(LIMIT, queues);

  /* Outputs

  enqueue
  ┌─────────┬────────────────────┬─────────────┬──────────────────┐
  │ (index) │ name               │ timing      │ normalizedTiming │
  ├─────────┼────────────────────┼─────────────┼──────────────────┤
  │ 0       │ 'DoubleArrayQueue' │ '6.7516ms'  │ '1.00x'          │
  │ 1       │ 'SingleArrayQueue' │ '10.3246ms' │ '1.53x'          │
  │ 2       │ 'LinkedListQueue'  │ '27.6806ms' │ '4.10x'          │
  └─────────┴────────────────────┴─────────────┴──────────────────┘

  dequeue
  ┌─────────┬────────────────────┬───────────────┬──────────────────┐
  │ (index) │ name               │ timing        │ normalizedTiming │
  ├─────────┼────────────────────┼───────────────┼──────────────────┤
  │ 0       │ 'LinkedListQueue'  │ '3.8519ms'    │ '1.00x'          │
  │ 1       │ 'DoubleArrayQueue' │ '9.9158ms'    │ '2.57x'          │
  │ 2       │ 'SingleArrayQueue' │ '4971.7428ms' │ '1290.72x'       │
  └─────────┴────────────────────┴───────────────┴──────────────────┘

  short queues
  ┌─────────┬────────────────────┬─────────────┬──────────────────┐
  │ (index) │ name               │ timing      │ normalizedTiming │
  ├─────────┼────────────────────┼─────────────┼──────────────────┤
  │ 0       │ 'DoubleArrayQueue' │ '10.4831ms' │ '1.00x'          │
  │ 1       │ 'SingleArrayQueue' │ '10.7441ms' │ '1.02x'          │
  │ 2       │ 'LinkedListQueue'  │ '41.6060ms' │ '3.97x'          │
  └─────────┴────────────────────┴─────────────┴──────────────────┘
  */
}

function enqueueBenchmarks(limit, queues) {
  console.log('\nenqueue');
  compareBenchmarks([
    createBenchmark('SingleArrayQueue', limit, i => {
      queues.singleArray.enqueue(i);
    }),
    createBenchmark('DoubleArrayQueue', limit, i => {
      queues.doubleArray.enqueue(i);
    }),
    createBenchmark('LinkedListQueue', limit, i => {
      queues.linkedList.enqueue(i);
    }),
  ]);
}

function dequeueBenchmarks(limit, queues) {
  console.log('\ndequeue');
  compareBenchmarks([
    createBenchmark('SingleArrayQueue', limit, i => {
      queues.singleArray.dequeue(i);
    }),
    createBenchmark('DoubleArrayQueue', limit, i => {
      queues.doubleArray.dequeue(i);
    }),
    createBenchmark('LinkedListQueue', limit, i => {
      queues.linkedList.dequeue(i);
    }),
  ]);
}

function shortQueueBechmarks(limit, queues) {
  console.log('\nshort queues');
  compareBenchmarks([
    createBenchmark('SingleArrayQueue', limit, i => {
      queues.singleArray.enqueue(i);
      queues.singleArray.enqueue(i);
      queues.singleArray.dequeue(i);
      queues.singleArray.dequeue(i);
    }),
    createBenchmark('DoubleArrayQueue', limit, i => {
      queues.doubleArray.enqueue(i);
      queues.doubleArray.enqueue(i);
      queues.doubleArray.dequeue(i);
      queues.doubleArray.dequeue(i);
    }),
    createBenchmark('LinkedListQueue', limit, i => {
      queues.linkedList.enqueue(i);
      queues.linkedList.enqueue(i);
      queues.linkedList.dequeue(i);
      queues.linkedList.dequeue(i);
    }),
  ]);
}
