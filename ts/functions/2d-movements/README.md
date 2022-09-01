# 2D Movements

The `get2dMovements` function returns a collection of functions to move in a 2D
grid represented as a 1D-array

- `size` is the cells count of the grid
- `width` is the size of a row

## Usage

```ts

// Setup grid
const grid = [
  'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't',
];

const size = grid.length;
const width = 5;

// Init movements functions
const { top, right, down, left } = get2dMovements(size, width);

// Look around 'g'
const g_index = grid.findIndex(x => x === 'g');
console.log(
  grid[top(g_index)], // 'b'
  grid[right(g_index)], // 'h'
  grid[down(g_index)], // 'l'
  grid[left(g_index)], // 'f'
);

// Impossible movements return null
const e_index = grid.findIndex(x => x === 'e');
console.log(
  grid[top(e_index)], // null (is on top border)
  grid[right(e_index)], // null (is on right border)
  grid[down(e_index)], // 'd'
  grid[left(e_index)], // 'j'
);
```

## Tests

```
npm i -g ts-node
ts-node 2d-movements.test.ts
```
