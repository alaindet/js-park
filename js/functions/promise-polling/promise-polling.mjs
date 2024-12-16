/**
 * @typedef {Object} PollingInstance
 * @property {() => void} start - A function to start the polling.
 * @property {() => void} stop - A function to stop the polling.
 */

/**
 * @typedef {Object} PollingConfiguration
 * @template TValue
 * @property {(() => Promise<TValue> | undefined)} source - A function that returns a Promise resolving to a value of type `TValue`.
 * @property {((value: TValue, stop: PollingInstance['stop']) => void | undefined)} onSuccess
 * @property {((err: any, stop: PollingInstance['stop']) => void | undefined)} onError
 * @property {((stop: PollingInstance['stop']) => void | undefined)} onComplete
 * @property {number | undefined} interval - The interval (in milliseconds) for polling.
 * @property {boolean | undefined} immediate - Triggers source immediately upon starting
 * @property {number | undefined} maxTimeouts - Maximum number of timeouts before auto stopping
 */

/**
 * @param {PollingConfiguration<any>} config
 * @returns {PollingInstance}
 */
export function createPolling({
  source,
  onSuccess = () => {},
  onError = () => {},
  onComplete = () => {},
  interval = 1000,
  immediate = false,
  maxTimeouts = 5,
}) {
  if (!source) {
    throw new Error('Missing mandatory polling source');
  }

  const POLLING_TIMEOUT = 'POLLING_TIMEOUT_' + String(Date.now());
  let timer = null;
  let running = false;
  let timeouts = 0;

  function start() {
    timeouts = 0;
    running = true;

    if (immediate) {
      onPolling();
    }

    timer = setInterval(onPolling, interval);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
    }
    running = false;
  }

  function createTimeout() {
    return new Promise((done) => {
      setTimeout(() => done(POLLING_TIMEOUT), interval);
    });
  }

  function onPolling() {
    if (!running) {
      return;
    }

    let timedOut = false;

    function _onSuccess(value) {
      if (!running) {
        return;
      }

      if (value === POLLING_TIMEOUT) {
        timedOut = true;
        timeouts++;
        return;
      }

      onSuccess(value, stop);
    }

    function _onComplete() {
      if (!running) {
        return;
      }

      if (timedOut) {
        console.log(`Polling timeout. The source did not emit any value in ${interval} milliseconds`);

        if (timeouts >= maxTimeouts) {
          console.log('Max timeouts reached, stopping polling automatically');
          stop();
        }

        return;
      }

      onComplete(stop);
    }

    Promise.race([source(), createTimeout()])
      .then(_onSuccess)
      .catch((err) => onError(err, stop))
      .finally(_onComplete);
  }

  return {
    start,
    stop,
  };
}
