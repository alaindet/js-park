const BENCHMARK_SIZE = 10000000; // Careful here!
const BENCHMARK_DEFAULT = 42;

const BENCHMARKS = [
  ['for++', arr => {
    let b;
    for (let i = 0; i < arr.length; i++) {
      b = arr[i];
    }
  }],

  ['++for', arr => {
    let b;
    for (let i = 0; i < arr.length; ++i) {
      b = arr[i];
    }
  }],

  ['for++ cached length', arr => {
    let b;
    for (let i = 0, len = arr.length; i < len; i++) {
      b = arr[i];
    }
  }],

  ['++for  cached length', arr => {
    let b;
    for (let i = 0, len = arr.length; i < len; ++i) {
      b = arr[i];
    }
  }],

  ['for..const in', arr => {
    let b;
    for (const i in arr) {
      b = arr[i];
    }
  }],

  ['for..let in', arr => {
    let b;
    for (let i in arr) {
      b = arr[i];
    }
  }],

  ['for..const of', arr => {
    let b;
    for (const val of arr) {
      b = val;
    }
  }],

  ['for..let of', arr => {
    let b;
    for (let val of arr) {
      b = val;
    }
  }],

  ['forEach', arr => {
    let b;
    arr.forEach(val => {
      b = val;
    });
  }]
];

const getBenchmarkArray = () => new Array(BENCHMARK_SIZE).fill(BENCHMARK_DEFAULT);

const normalizeResults = rawResults => {

  const results = [];
  let bestTime = rawResults[0].time;

  // Calculate max time
  for (const result of rawResults) {
    if (result.time < bestTime) {
      bestTime = result.time;
    }
  }

  // Calculate scores
  for (const result of rawResults) {
    const { name, time } = result;
    const score = 100 * (1 / (time / bestTime));
    results.push({ name, score, time });
  }

  // Sort descending
  results.sort((a, b) => (a.score === b.score) ? 0 : (a.score > b.score ? -1 : 1));

  return results;
};

const runBenchmarks = async (timer) => {
  return new Promise((resolve, _) => {
    resolve(
      normalizeResults(
        BENCHMARKS.map(benchmark => {
          const [name, fn] = benchmark;
          const t0 = timer();
          fn(getBenchmarkArray());
          const time = timer() - t0;
          return { name, time };
        })
      )
    );
  });
};

// Browser will ignore this
module.exports = { runBenchmarks, BENCHMARKS };
