/**
 * How can you loop on promises, really?
 *
 * This experiment tests how promises and loops interact in JavaScript
 *
 * TL;DR: for await...of is the clear winner
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
 */

run(); // <-- Start here

/**
 * Outputs
 * For then example
 * # Parallel-ish, does not wait until finished
 * +0.004s Finished.
 * +0.209s a
 * +0.210s b
 * +0.210s c
 * +0.211s d
 * +0.211s e
 * +0.212s f
 *
 * For nested await example
 * # Each iteration blocks the loop (slow!)
 * +0.203s a
 * +0.404s b
 * +0.605s c
 * +0.806s d
 * +1.008s e
 * +1.213s f
 * +1.214s Finished.
 *
 * For await...of example
 * # Parallel-ish, loop wait all promises to settle
 * +0.203s a
 * +0.203s b
 * +0.204s c
 * +0.205s d
 * +0.205s e
 * +0.205s f
 * +0.205s Finished.
 *
 * For WaitGroup (similar to Go's sync.WaitGroup)
 * # Parallel-ish, loop wait all promises to settle via WaitGroup
 * +0.203s a
 * +0.203s b
 * +0.204s c
 * +0.204s d
 * +0.204s e
 * +0.204s f
 * +0.205s Finished.
 */

async function run() {
  await forThenExample();
  await forNestedAwaitExample();
  await forAwaitOfExample();
  await forWaitGroupExample();
}

function forThenExample() {
  return new Promise(done => {
    const requestsCount = 5;
    const delay = 200;
    const { clock, requests } = _setupExample(requestsCount, delay);

    _printTitleAndDescription(
      'For then example',
      'Parallel-ish, does not wait until finished',
    );

    // INTERESTING STARTS HERE
    for (const request of requests) {
      request().then(res => clock.track(res));
    }

    clock.end();
    // INTERESTING ENDS HERE

    // This is needed as there's no mechanism to "wait" for the requests to end
    setTimeout(done, requestsCount * delay);
  });
}

function forNestedAwaitExample() {
  return new Promise(async done => {
    const { clock, requests } = _setupExample(5, 200);

    _printTitleAndDescription(
      'For nested await example',
      'Each iteration blocks the loop (slow!)',
    );

    // INTERESTING STARTS HERE
    for (const request of requests) {
      const res = await request();
      clock.track(res);
    }

    clock.end();
    // INTERESTING ENDS HERE

    done();
  });
}

function forAwaitOfExample() {
  return new Promise(async done => {

    const { clock, requests } = _setupExample(5, 200);

    _printTitleAndDescription(
      'For await...of example',
      'Parallel-ish, loop wait all promises to settle',
    );

    // INTERESTING STARTS HERE
    for await (const response of requests.map(request => request())) {
      clock.track(response);
    }

    clock.end();
    // INTERESTING ENDS HERE

    done();
  });
}

function forWaitGroupExample() {
  return new Promise(async done => {

    const wg = _createWaitGroup();
    const { clock, requests } = _setupExample(5, 200);

    _printTitleAndDescription(
      'For WaitGroup (similar to Go\'s sync.WaitGroup)',
      'Parallel-ish, loop wait all promises to settle via WaitGroup',
    );

    // INTERESTING STARTS HERE
    wg.add(requests.length);

    for (const request of requests) {
      request().then(res => {
        clock.track(res);
        wg.done();
      });
    }

    await wg.wait();
    clock.end();
    // INTERESTING ENDS HERE

    done();
  });
}

function _setupExample(requestsCount = 5, delay = 200) {
  const clock = _createClock();
  clock.start();
  const requests = _createFakeRequests(requestsCount, delay);

  return { requests, clock };
}

function _createFakeRequests(requestsCount = 3, delay) {

  const ALPHABET = 'abcdefghijklmnopqrstuvz';

  const requests = [];

  for (let i = 0; i <= requestsCount; i++) {
    const round = Math.floor(i / ALPHABET.length) + 1;
    const letterIndex = i % ALPHABET.length;
    const letter = ALPHABET[letterIndex];
    const message = letter.repeat(round);
    const request = _createFakeRequest(message, delay);
    requests.push(request);
  }

  return requests;
}

function _createFakeRequest(message, delay) {
  return () => new Promise(done => {
    setTimeout(() => done(message), delay);
  });
}

function _createClock() {

  let startedOn = null;

  function _track() {
    const now = Date.now();
    const elapsedMilliseconds = now - (startedOn ?? Date.now());
    const elapsedSeconds = elapsedMilliseconds / 1000;
    return `+${elapsedSeconds.toFixed(3)}s`;
  }

  function track(message) {
    console.log(_track(), message);
  }

  function start() {
    startedOn = Date.now();
  }

  function end() {
    track('Finished.');
  }

  return { start, end, track };
}

function _printTitleAndDescription(title, description) {
  console.log(`\n${title}`);
  console.log(`# ${description}`);
}

function _createWaitGroup() {

	let workers = 0;
	let queue;

	function add(workersToAdd = 1) {

		if (workersToAdd < 0) {
			throw new Error('Cannot provide negative number of workers');
		}

		workers += workersToAdd;

		if (!workers) {
			dequeue();
		}
	}

	function done() {
		if (!workers) {
			throw new Error('No worker remaining');
		}

		workers--;

		if (!workers) {
			dequeue();
		}
	}

	function wait() {
		return new Promise(enqueue);
	}

	function enqueue(done) {

		if (!workers) {
			done();
			return;
		}

		if (queue === undefined) {
			queue = [];
		}

		queue.push(done);
	}

	function dequeue() {
		while (queue.length) {
			const workerFn = queue.shift();

			if (workerFn) {
				workerFn();
			}
		}
	}

	return {
		add,
		done,
		wait,
	};
}
