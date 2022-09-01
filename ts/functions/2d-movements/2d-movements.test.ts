import { get2dMovements } from './2d-movements';

const testBoard = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't',
];

const testWidth = 5;

const testCases: [
  string,
  'up' | 'right' | 'down' | 'left',
  string | null,
][] = [

  // TL corner
  ['a', 'up', null],
  ['a', 'right', 'b'],
  ['a', 'down', 'f'],
  ['a', 'left', null],

  // TR corner
  ['e', 'up', null],
  ['e', 'right', null],
  ['e', 'down', 'j'],
  ['e', 'left', 'd'],

  // BR corner
  ['t', 'up', 'o'],
  ['t', 'right', null],
  ['t', 'down', null],
  ['t', 'left', 's'],

  // BL corner
  ['p', 'up', 'k'],
  ['p', 'right', 'q'],
  ['p', 'down', null],
  ['p', 'left', null],

  // Left border
  ['f', 'up', 'a'],
  ['f', 'right', 'g'],
  ['f', 'down', 'k'],
  ['f', 'left', null],

  // Right border border
  ['o', 'up', 'j'],
  ['o', 'right', null],
  ['o', 'down', 't'],
  ['o', 'left', 'n'],

  // Middle
  ['h', 'up', 'c'],
  ['h', 'right', 'i'],
  ['h', 'down', 'm'],
  ['h', 'left', 'g'],
];

console.clear();
const moveFns = get2dMovements(testBoard.length, testWidth);

try {
  for (const t of testCases) {
    const [startCell, dir, expectedCell] = t;
    const input = testBoard.findIndex(n => n === startCell);
    let expected: number | null = testBoard.findIndex(n => n === expectedCell);
    if (expected === -1) expected = null;
    const result = moveFns[dir](input);

    if (result !== expected) {
      const testName = `${startCell}+${dir}=${expectedCell}`;
      throw new Error(`${testName} - Got ${result}, expected ${expected}`);
    }
  };
  console.log('TESTS PASSED');
}

catch (err) {
  console.log('TESTS FAILED');
  console.log(err);
}
