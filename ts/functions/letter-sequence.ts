function createLetterSequence(initialValue: string | null = null) {

  const LETTERS_REGEX = /^[a-z]+$/;
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

  let letters = LETTERS.split('');
  const letterToIndex: { [letter: string]: number } = {};
  letters.forEach((letter, index) => letterToIndex[letter] = index);

  let lastValue: string | null = initialValue;
  if (lastValue !== null && !LETTERS_REGEX.test(lastValue)) {
    throw new Error('invalid letter sequence initial value');
  }

  return function (): string {

    if (lastValue === null) {
      lastValue = letters[0];
      return lastValue;
    }

    const letter = lastValue[lastValue.length - 1];
    const index = letterToIndex[letter];
    let nextIndex = index + 1;

    if (nextIndex === letters.length) {
      lastValue = lastValue + 'a';
      return lastValue;
    }

    const nextLetter = letters[nextIndex];
    lastValue = lastValue.slice(0, -1) + nextLetter;

    return lastValue;
  }
}
