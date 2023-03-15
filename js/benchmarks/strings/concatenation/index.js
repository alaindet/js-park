const { performance } = require('perf_hooks');

const WORDS = require('./data');

const results = [];
const timer = () => performance.now();
const TEST_DATA = [
  ...WORDS,
  ...WORDS.reverse(),
  ...WORDS,
  ...WORDS.reverse(),
  ...WORDS,
  ...WORDS.reverse(),
];

// Concat
let t0 = timer();
"".concat(...TEST_DATA);
results.push({ name: 'Concat', time: timer() - t0 });

// Plus
t0 = timer();
let result = '';
TEST_DATA.forEach(word => result += word);
results.push({ name: 'Plus', time: timer() - t0 });

// Join
t0 = timer();
TEST_DATA.join('');
results.push({ name: 'Join', time: timer() - t0 });

// Results
results.sort((a, b) => (a.time === b.time) ? 0 : (a.time < b.time ? -1 : 1));
console.log(`WORDS COUNT: ${TEST_DATA.length}`);
console.table(results);

/*
Node v16.15.1
WORDS COUNT: 60000

Attempt #1
┌─────────┬──────────┬────────────────────┐
│ (index) │   name   │        time        │
├─────────┼──────────┼────────────────────┤
│    0    │ 'Concat' │ 1.9997000098228455 │
│    1    │  'Join'  │  2.63510000705719  │
│    2    │  'Plus'  │ 3.904100000858307  │
└─────────┴──────────┴────────────────────┘

Attempt #2
┌─────────┬──────────┬────────────────────┐
│ (index) │   name   │        time        │
├─────────┼──────────┼────────────────────┤
│    0    │ 'Concat' │ 1.8407000303268433 │
│    1    │  'Join'  │ 3.0944000482559204 │
│    2    │  'Plus'  │ 3.7890999913215637 │
└─────────┴──────────┴────────────────────┘

Attempt #3
┌─────────┬──────────┬────────────────────┐
│ (index) │   name   │        time        │
├─────────┼──────────┼────────────────────┤
│    0    │ 'Concat' │ 2.1201000213623047 │
│    1    │  'Join'  │ 2.810100018978119  │
│    2    │  'Plus'  │ 3.9817000031471252 │
└─────────┴──────────┴────────────────────┘
*/
