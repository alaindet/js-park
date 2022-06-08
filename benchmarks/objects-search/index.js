/*
 * This script compares searches mechanisms in an array of simple objects. Test
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
 * Results (03/08/2020 23:20)
 * Test #1 (Lowercase flat map + findIndex): 2587.260ms
 * Test #2 (Existing flat map + findIndex): 2450.808ms
 * Test #3 (On demand flattening + findIndex): 11542.031ms
 * Test #4 (Plain findIndex): 8411.974ms
 */

const faker = require('faker');

const ITEMS_COUNT = 100 * 100 * 100;
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
  searches = [...searches, search.toLowerCase()];
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
      flatItem += item[key];
    }

    return flatItem.toLowerCase().indexOf(search) !== -1;
  });
}

console.timeEnd(test3_label);


// Test 4: Using only find ----------------------------------------------------
const test4_label = 'Test #4 (Plain findIndex)';

console.time(test4_label);

for (const search of searches) {
  const index = data.findIndex(item => {

    for (const key in item) {
      if (item[key].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        return true;
      }
    }

    return false;
  });
}

console.timeEnd(test4_label);
