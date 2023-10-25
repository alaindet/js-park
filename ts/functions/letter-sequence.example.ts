const seq1 = createLetterSequence();

console.log(
  seq1(), // a
  seq1(), // b
  seq1(), // c
  seq1(), // d
);


const seq2 = createLetterSequence('x');

console.log(
  seq2(), // y
  seq2(), // z
  seq2(), // za
  seq2(), // zb
);
