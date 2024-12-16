/**
 * @typedef {Object} PollingInstance
 * @property {() => void} start - A function to start the polling.
 * @property {() => void} stop - A function to stop the polling.
 */

/**
 * @typedef {Object} PollingConfiguration
 * @template TValue
 * @property {() => Promise<TValue>} source - A function that returns a Promise resolving to a value of type `TValue`.
 * @property {(value: TValue, stop: PollingInstance['stop']) => void} onSuccess
 * @property {(err: any, stop: PollingInstance['stop']) => void} onError
 * @property {(stop: PollingInstance['stop']) => void} onComplete
 * @property {number} interval - The interval (in milliseconds) for polling.
 * @property {boolean} autoStart - Immediately starts polling
 * @property {number} maxTimeouts - Maximum number of timeouts before auto stopping
 */

/**
 * @param {PollingConfiguration<any>} config
 * @returns
 */
export function createPolling(config) {
  const POLLING_TIMEOUT = 'POLLING_TIMEOUT_' + String(Date.now());
  let timer = null;
  let timeouts = 0;

  function createPollingTimeout() {
    return new Promise((done) => {
      setTimeout(() => done(POLLING_TIMEOUT), config.interval - 10);
    });
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
    }
  }

  function start() {
    timer = setInterval(() => {
      let timedOut = false;

      function onSuccess(value) {
        if (value === POLLING_TIMEOUT) {
          timedOut = true;
          timeouts++;
          return;
        }

        config.onSuccess(value, stop);
      }

      function onComplete() {
        if (timedOut) {
          console.log(
            `Polling timeout. The source did not emit any value in ${config.interval} milliseconds`
          );

          if (timeouts >= config.maxTimeouts) {
            console.log('Max timeouts reached, stopping polling automatically');
            stop();
          }

          return;
        }

        config.onComplete(stop);
      }

      Promise.race([config.source(), createPollingTimeout()])
        .then(onSuccess)
        .catch((err) => config.onError(err, stop))
        .finally(onComplete);
    }, config.interval);
  }

  if (!!config.autoStart) {
    start();
  }

  return {
    start,
    stop,
  };
}
