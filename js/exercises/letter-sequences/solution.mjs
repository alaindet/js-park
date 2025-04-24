export function countLetterSequences(word, options = {}) {
  const result = [];
  let normalizedWord = word.trim();
  const ignoreCase = !!options?.ignoreCase;
  if (ignoreCase) {
    normalizedWord = normalizedWord.toLowerCase();
  }
  const letters = normalizedWord.trim().split('');
  let lastLetter = null;
  let lastLetterCount = 0;

  for (let i = 0, len = letters.length; i < len; i++) {
    const letter = letters[i];

    // Continue sequence?
    if (letter === lastLetter) {
      lastLetterCount++;
      continue;
    }

    // Skip adding sequence data on first sequence
    if (lastLetter !== null) {
      result.push([lastLetter, lastLetterCount]);
    }

    // Start a new sequence
    lastLetter = letter;
    lastLetterCount = 1;
  }

  if (lastLetterCount > 0) {
    result.push([lastLetter, lastLetterCount]);
  }

  return result;
}

export function compactLetterSequences(sequences) {
  return sequences.map(([letter, n]) => letter.repeat(n)).join('');
}
