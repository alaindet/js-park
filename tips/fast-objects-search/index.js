/*
 * This text compares "full text searches" of an array of simple objects. Test
 * cases are
 * 
 * 1. Flat map + findIndex
 * Generates a flat, lowercase-only array of strings first, then uses the
 * Array.prototype.findIndex method
 * 
 * 2. Pre-existing flat map + findIndex
 * Uses Array.prototype.findIndex on a pre-existing flat map
 * 
 * 3. On demand flattening + findIndex
 * Flattens current row only then applies Array.prototype.findIndex
 * 
 * 4. Plain find
 * Skips generating any auxiliary flat string or array and uses
 * Array.prototype.findIndex straight away
 * 
 * Results (02/08/2020 07:04)
 * Test #1 (Lowercase flat map + findIndex): 67030.046ms
 * Test #2 (Existing flat map + findIndex): 66141.930ms
 * Test #3 (On demand flattening + findIndex): 413125.750ms
 * Test #4 (Plain findIndex): 28659.449ms
 */

const faker = require('faker');

const ITEMS_COUNT = 100 * 100 * 10;
const SEARCH_COUNT = 100 * 100;

// Setup ----------------------------------------------------------------------

// https://github.com/alaindet/javascript-playground/blob/master/functions/random.js
const myRandInt = (a, b) => a + Math.floor((Math.random() * (b - a + 1)));

const data = [];
for (let i = 0; i < ITEMS_COUNT; i++) {
  data.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.country(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  });
}

let searches = [];
const keys = Object.keys(data[0]);
for (let j = 0; j < SEARCH_COUNT; j++) {
  const index = myRandInt(0, ITEMS_COUNT - 1);
  const key = myRandInt(0, keys.length - 1);
  const search = data[index][keys[key]];
  searches = [...searches, search];
}

// Test 1: Using a lowercase flat map + find ----------------------------------
const test1_label = 'Test #1 (Lowercase flat map + findIndex)';

console.time(test1_label);

const test1_flattenedData = data.map(item => {
  let flat = '';
  for (const key in item) {
    flat += item[key].toLowerCase();
  }
  return flat;
});

for (const search of searches) {
  const index = test1_flattenedData.findIndex(
    item => item.indexOf(search) !== -1
  );
}

console.timeEnd(test1_label);

// Test 2: Using find on existing flat map ------------------------------------
const test2_label = 'Test #2 (Existing flat map + findIndex)';

console.time(test2_label);

for (const search of searches) {
  const index = test1_flattenedData.findIndex(
    item => item.indexOf(search) !== -1
  );
}

console.timeEnd(test2_label);

// Test 3: On demand flattening + find ----------------------------------------
const test3_label = 'Test #3 (On demand flattening + findIndex)';

console.time(test3_label);

for (const search of searches) {
  const index = data.findIndex(item => {

    let flatItem = '';
    for (const key in item) {
      flatItem += item[key].toLowerCase();
    }

    return flatItem.indexOf(search) !== -1;
  });
}

console.timeEnd(test3_label);


// Test 4: Using only find ----------------------------------------------------
const test4_label = 'Test #4 (Plain findIndex)';

console.time(test4_label);

for (const search of searches) {
  const index = data.findIndex(item => {

    for (const key in item) {
      if (item[key].indexOf(search) !== -1) {
        return true;
      }
    }

    return false;
  });
}

console.timeEnd(test4_label);
