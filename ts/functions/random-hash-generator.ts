type RandomHashGeneratorConfig = {
  withUpperCase?: boolean;
  withUniqueValues?: boolean;
  maxRetries?: number;
  hashLength?: number;
  randomGenerator?: (from: number, to: number) => number;
};

function createRandomHashGenerator(_config?: RandomHashGeneratorConfig) {

  const defaultConfig: Required<RandomHashGeneratorConfig> = {
    withUpperCase: false,
    withUniqueValues: false,
    maxRetries: 10,
    hashLength: 3,
    randomGenerator: getRandomInteger,
  };

  const config: Required<RandomHashGeneratorConfig> = {
    ...defaultConfig,
    ...(_config ?? {}),
  };

  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  const lastIndex = ALPHABET.length - 1;

  let getRandomLetter = () => ALPHABET[getRandomInteger(0, lastIndex)];
  if (config.withUpperCase) {
    const getRandomLowercaseLetterGenerator = getRandomLetter;
    getRandomLetter = () => {
      const letter = getRandomLowercaseLetterGenerator();
      return Math.random() > 0.5 ? letter.toUpperCase() : letter;
    };
  }

  function hashGenerator(_hashLength?: number) {
    const hashLength = _hashLength ?? config.hashLength;
    const result: string[] = [];
    for (let i = 0; i < hashLength; i++) {
      result.push(getRandomLetter());
    }
    return result.join('');
  }

  if (!config.withUniqueValues) {
    return hashGenerator;
  }

  const registry = new Set();

  function tryGeneratingUniqueHash(_hashLength?: number) {
    const hashLength = _hashLength ?? config.hashLength;
    let hash = hashGenerator(hashLength);
    if (!registry.has(hash)) {
      return hash;
    }

    for (let retries = 0; retries < config.maxRetries; retries++) {
      hash = hashGenerator(hashLength);
      if (!registry.has(hash)) {
        return hash;
      }
    }

    throw new Error(
      'Reached max retries, try creating a longer hash to avoid collisions'
    );
  }

  return function (_hashLength?: number) {
    const hashLength = _hashLength ?? config.hashLength;
    const hash = tryGeneratingUniqueHash(hashLength);
    registry.add(hash);
    return hash;
  };
}

function getRandomInteger(from: number, to: number): number {
  return from + Math.floor(Math.random() * (to - from + 1));
}
