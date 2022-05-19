const { performance } = require('perf_hooks');

const benchmarks = require('./benchmarks');

(async () => {
  console.log('Running benchmarks...');
  const timer = () => performance.now();
  const RESULTS = await benchmarks.runBenchmarks(timer, benchmarks.BENCHMARKS);
  console.table(RESULTS);
})();
