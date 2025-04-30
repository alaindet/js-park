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

  const best = normalizedTimings.shift();
  console.log(`${best.name}\t${best.timing.toFixed(3)}ms\t1x`);

  normalizedTimings.forEach(t => {
    const slowerTime = t.normalizedTiming.toFixed(2) + 'x';
    console.log(`${t.name}\t${t.timing.toFixed(3)}ms\t${slowerTime}`);
  });
}

function timeIt(fn) {
  const start = performance.now();
  fn();
  return performance.now() - start;
}
