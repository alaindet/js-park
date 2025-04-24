import { countLetterSequences } from './solution.mjs';

testCountLetterSequences();

function testCountLetterSequences() {
  const testCases = [
    {
      name: 'Empty string',
      input: '',
      expected: [],
    },
    {
      name: 'With extra space',
      input: '     cccc    ',
      expected: [['c', 4]],
    },
    {
      name: 'Same letter',
      input: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      expected: [['x', 42]],
    },
    {
      name: 'Same letter but last',
      input: 'aaaab',
      expected: [
        ['a', 4],
        ['b', 1],
      ],
    },
    {
      name: 'Mixed casing',
      input: 'aaAAaaaAAA',
      expected: [
        ['a', 2],
        ['A', 2],
        ['a', 3],
        ['A', 3],
      ],
    },
    {
      name: 'Mixed casing with ignoreCase option',
      input: ['aaAAaaaAAA', { ignoreCase: true }],
      expected: [['a', 10]],
    },
    {
      name: 'Mixed letters',
      input: 'aaaabbbcca',
      expected: [
        ['a', 4],
        ['b', 3],
        ['c', 2],
        ['a', 1],
      ],
    },
  ];

  let testsCount = 0;
  let failedTestsCount = 0;

  for (const testCase of testCases) {
    const outcome = Array.isArray(testCase.input)
      ? countLetterSequences(...testCase.input)
      : countLetterSequences(testCase.input);

    const outcomeString = JSON.stringify(outcome);
    const expectedString = JSON.stringify(testCase.expected);
    const passed = outcomeString == expectedString;
    testsCount++;

    if (!passed) {
      failedTestsCount++;
    }

    console.log(`${testCase.name}:`, passed ? 'OK' : 'ERROR');
    if (!passed) {
      console.log(`   Expected ${expectedString} but got ${outcomeString}`);
    }
  }

  const passedTestsCount = testsCount - failedTestsCount;
  console.log(`\n---\n${passedTestsCount}/${testsCount} tests passed.`);
  console.log(failedTestsCount === 0 ? 'OK' : 'ERROR');
}
