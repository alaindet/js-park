const TIMEOUT = 1000;

function createGoodRequest(id) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(id), TIMEOUT);
  });
}

function createBadRequest(id) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(id), TIMEOUT);
  });
}

const requests = [
  createGoodRequest('first'),
  createGoodRequest('second'),
  createBadRequest('third'), // <-- ERROR!!!
  createGoodRequest('fourth'), // These will never run
  createGoodRequest('fifth'), // These will never run
];

(async () => {
  const startTime = Date.now();
  try {
    for (const req of requests) {
      const id = await req;
      const delta = (Date.now() - startTime) / 1000;
      const elapsed = `+${delta.toFixed(3)}s`;
      console.log('res', id, elapsed);
    }
    console.log('DONE');
  } catch (err) {
    console.log('ERROR', err);
  }
})();
