/**
 * Extract a random number in a range by giving the lower and upper ends.
 * Accepts negative and/or floats. Step can be anything > 0.
 * If not step is provided, it's calculated from both ends' lowest precision
 * Does validation and throws errors:
 * - Checks if a and b are numbers
 * - Checks if a <= b
 * - Checks if the range is a multiple of step
 * 
 * Ex.: myRandom(-10, 2.5, 0.25) => -3.25
 * 
 * @param {number} a The lower end of the range
 * @param {number} b The upper end of the range
 * @param {number} step The distance between points (optional)
 */
const myRandom = (a, b, step) => {

  // Validation
  if (typeof (a) !== 'number') throw 'Lower end must be a number';
  if (typeof (b) !== 'number') throw 'Upper end must be a number';
  if (a > b) throw 'Lower end must be less than or equal to upper end';

  // Deduce step if not passed by user
  if (typeof (step) === 'undefined') {
    const getPrecision = (x) => {
      const digits = Number(x).toString().split('.');
      const decimals = (digits[1] || []).length;
      return Math.pow(10, -decimals);
    };
    step = Math.min(getPrecision(a), getPrecision(b));
  }

  // Calculate the expanded range
  const range = Math.abs(b - a + step);

  // Validate step
  if (range % step !== 0) {
    throw `Range (b - a = ${range}) must be a multiple of step ${step}`;
  }

  return a + Math.floor((Math.random() * range) / step) * step;
};


/**
 * Shorter version of myRandom, without any validation (faster and shorter)
 * 
 * @param {number} a The lower end of the range
 * @param {number} b The upper end of the range
 * @param {number} s Step. The distance between points (optional)
 */
const myRand = (a,b,s) => a+Math.floor((Math.random()*Math.abs(b-a+s))/s)*s;


/**
 * Simpler version of myRand for positive integers only. Step = 1;
 * 
 * @param {number} a The lower end of the range
 * @param {number} b The upper end of the range
 */
const myRandInt = (a, b) => a + Math.floor((Math.random() * (b - a + 1)));


// TEST
// ----------------------------------------------------------------------------

// Data (Change only here)
const func = myRandom;
const a = -20;
const b = 15;
const step = 2.5;
const iterations = 1000 * 1000; // One million
const eol = '\n'; // Change to \r\n on Windows

// // TIME TEST (Uncomment to measure time for iterations only)
// console.time(func.name);
// let results = [];
// for (let i = 0; i < iterations; i++) {
//   results.push(func(a, b, step));
// }
// console.timeEnd(func.name);
// return;
// // END TIME TEST

// Prepare the counters
let counters = {};
for (let i = 0, len = Math.abs(b - a) / step; i <= len; i++) {
  counters[`C${a + i * step}`] = 0;
}

// Start the cronometer
console.time(func.name);

// Loop
try {
  for (let i = 0; i < iterations; i++) {
    counters[`C${func(a, b, step)}`]++;
  }
} catch (error) {
  console.timeEnd(func.name);
  console.log(error);
  return;
}

// Stop the cronometer
console.timeEnd(func.name);

// Results
console.log([
  `===================`,
  `a: ${a}`,
  `b: ${b}`,
  `step: ${step}`,
  `iterations: ${iterations}`,
  `===================`
].join(eol));

const pad = (x, length, filler, direction) => {
  x += '';
  while (x.length < length) direction === 'r' ? x += filler : x = filler + x;
  return x;
};

// Final results as text
let counterLength = 'VALUE'.length;
const text = Object.keys(counters)
  .map((counter) => {
    if (counter.length > counterLength) { counterLength = counter.length; }
    return counter;
  })
  .reduce((text, counter) => {
    counterString = counter.substring(1);
    counterString = pad(counterString, counterLength - 1, ' ', 'l');
    return text += `${counterString} : ${counters[counter]}${eol}`;
  }, `${pad('VALUE', counterLength - 1, ' ', 'l')} : COUNT${eol}`)

// Output in the console
console.log(text);

// // Write on disk
// // (Uncomment this to write on disk, using Node.js)
// const fs = require('fs');
// const timestamp = Date.now();
// const extension = 'dat';
// const filename = `${__dirname}/${func.name}-test-${timestamp}.${extension}`;
// fs.writeFile(filename, results, (err) => {
//   console.log(err || `File saved:${eol}${filename}`)
// });


// RESULTS
// ----------------------------------------------------------------------------

/*
myRandom: 456.485ms
===================
a: -20
b: 15
step: 2.5
iterations: 1000000
===================
VALUE : COUNT
  -20 : 66295
-17.5 : 66767
  -15 : 67070
-12.5 : 66809
  -10 : 66384
 -7.5 : 66739
   -5 : 66559
 -2.5 : 66750
    0 : 66748
  2.5 : 66296
    5 : 66420
  7.5 : 66629
   10 : 66996
 12.5 : 66711
   15 : 66827
*/
