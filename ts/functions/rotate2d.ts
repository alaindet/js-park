/*
Rotate Clock-wise

Ex.:
0 1    4 2 0
2 3 => 5 3 1
4 5
*/
function rotateCw<T = any>(arr: T[][]): T[][] {
  const result: T[][] = [];

  for (let j = 0; j < arr[0].length; j++) {
    let row: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      row.push(arr[i][j]);
    }
    result.push(row.reverse());
  }

  return result;
}

/*
Rotate Counter-clock-wise

Ex.:
0 1    1 3 5
2 3 => 0 2 4
4 5
*/
function rotateCcw<T = any>(arr: T[][]): T[][] {
  const result: T[][] = [];

  for (let j = arr[0].length - 1; j >= 0; j--) {
    let row: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      row.push(arr[i][j]);
    }
    result.push(row);
  }

  return result;
}
