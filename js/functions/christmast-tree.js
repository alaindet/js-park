const christmasTree = (rows) => {

  if (rows < 1 || rows > 42) {
    return 'ERROR: You must provide a valid rows count';
  }

  let length = 2 * rows - 1;
  let row = '*'.repeat(length);
  const minLength = rows;
  const reversedRows = [row];

  while (length > minLength) {
    row = ' ' + row.substring(0, row.length - 2);
    reversedRows.push(row);
    length--;
  }

  return reversedRows.reverse().join('\n');
};

// TESTS
[2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => console.log(christmasTree(i)));
