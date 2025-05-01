import { performance } from 'node:perf_hooks';

export function compareBenchmarks(benchmarks) {
  const timings = benchmarks.map(({ name, benchmark }) => {
    const timing = timeIt(benchmark);
    return { name, timing };
  });

  let bestTiming = null;

  for (const { timing } of timings) {
    if (bestTiming === null || timing < bestTiming) {
      bestTiming = timing;
    }
  }

  const normalizedTimings = timings
    .map(({ name, timing }) => {
      const normalizedTiming = timing / bestTiming;
      return { name, timing, normalizedTiming };
    })
    .sort((a, b) => a.normalizedTiming - b.normalizedTiming);

  console.table(
    normalizedTimings.map(nt => ({
      name: nt.name,
      timing: nt.timing.toFixed(4) + 'ms',
      normalizedTiming: nt.normalizedTiming.toFixed(2) + 'x',
    }))
  );
}

function timeIt(fn) {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

export function createBenchmark(name, iterations, fn) {
  return {
    name,
    benchmark: () => {
      for (let i = 0; i < iterations; i++) {
        fn(i);
      }
    },
  };
}

export function range(sup) {
  const result = [];

  for (let i = 0; i < sup; i++) {
    result.push(i);
  }

  return result;
}
