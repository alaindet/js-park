function range(fromOrTo, to) {
  const result = [];
  const [start, stop] = to ? [fromOrTo, to] : [0, fromOrTo];
  for (let i = start; i <= stop; i++) {
    result.push(i);
  }
  return result;
}

function elidedRange(total, current, diameter) {

  // Diameter must be odd
  if (diameter % 2 === 0) {
    throw new Error(`Diameter must be odd, ${diameter} given`);
  }

  const result = [];
  const radius = (diameter - 1) / 2;

  let windowInf = current - radius;
  while (windowInf < 1) {
    windowInf++;
  }
  const elideLeft = windowInf - 1 > 1;

  let windowSup = current + radius;
  while (windowSup > total) {
    windowSup--;
  }
  const elideRight = total - windowSup > 1;

  if (windowInf !== 1) {
    result.push(1);
  }
  
  if (elideLeft) {
    result.push(null);
  }
  
  result.push(...range(windowInf, windowSup));
  
  if (elideRight) {
    result.push(null);
  }
  
  if (windowSup !== total) {
    result.push(total);
  }

  return result;
}

// TESTS ---------------------------------------------------------
[
  [100, 26, 5],
  [10, 1, 5],
  [1, 1, 5],
  [3, 1, 25],
  [99, 1, 25],
].forEach(test => {
  try {
    const [total, current, diameter] = test;
    const result = elidedRange(total, current, diameter);
    const sequence = result
      .map(n => {
        if (n === null) return '...';
        if (n === current) return `(${n})`;
        return n;
      })
      .join(',');
    console.log(`elidedRange(${total},${current},${diameter}) = ${sequence}`);
  } catch (error) {
    console.error(error);
  }
});

/*
elidedRange(100,26,5) = 1,...,24,25,(26),27,28,...,100
elidedRange(10,1,5) = (1),2,3,...,10
elidedRange(1,1,5) = (1)
elidedRange(3,1,25) = (1),2,3
elidedRange(99,1,25) = (1),2,3,4,5,6,7,8,9,10,11,12,13,...,99
*/
