/*
 * This text compares "full text searches" of an array of simple objects. Test
 * cases are
 * 
 * 1. Flat map + find
 * Generates a flat, lowercase-only array of strings first, then uses the
 * Array.prototype.find method
 * 
 * 2. Find on pre-existing flat map
 * Uses Array.prototype.find on a pre-existing flat map
 * 
 * 3. Plain find
 * Skips generating any auxiliary flat array and uses Array.prototype.find
 * straight away
 * 
 * Results (02/08/2020 07:04)
 * Test #1 (Lowercase flat map + find): 67624.055ms
 * Test #2 (Existing flat map + find): 66729.672ms
 * Test #3 (Plain find): 29760.247ms
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
const test1_label = 'Test #1 (Lowercase flat map + find)';

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
const test2_label = 'Test #2 (Existing flat map + find)';

console.time(test2_label);

for (const search of searches) {
  const index = test1_flattenedData.findIndex(
    item => item.indexOf(search) !== -1
  );
}

console.timeEnd(test2_label);

// Test 3: Using only find ----------------------------------------------------
const test3_label = 'Test #3 (Plain find)';

console.time(test3_label);

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

console.timeEnd(test3_label);
