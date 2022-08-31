const rot13 = require('./rot13');

const testCases = [
  {
    input: "EBG13 rknzcyr.",
    expected: "ROT13 example.",
  },
  {
    input: "How can you tell an extrovert from an\nintrovert at NSA? Va gur ryringbef,\ngur rkgebireg ybbxf ng gur BGURE thl'f fubrf.",
    expected: "Ubj pna lbh gryy na rkgebireg sebz na\nvagebireg ng AFN? In the elevators,\nthe extrovert looks at the OTHER guy's shoes."
  },
  {
    input: "123",
    expected: "123",
  },
	{
    input: "Guvf vf npghnyyl gur svefg xngn V rire znqr. Gunaxf sbe svavfuvat vg! :)",
    expected: "This is actually the first kata I ever made. Thanks for finishing it! :)",
  },
  {
    input: "@[`{",
    expected: "@[`{",
  },
];

try {
  console.time('rot13');
  testCases.forEach(testCase => {
    const testName = `rot13("${testCase.input}")`;
    const result = rot13(testCase.input);
    if (result !== testCase.expected) {
      const msg = `ERROR: ${testName}\nExpected "${testCase.expected}", got "${result}"`;
      throw new Error(msg);
    }
  });
  console.log('Tests passed');
  console.timeEnd('rot13');
}

catch (err) {
  console.error(err);
}
