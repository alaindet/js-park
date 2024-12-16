import { createPolling } from './promise-polling.mjs';

const polling = createPolling({
  source: () => generateRequest({ delay: 300, errPercentage: 0 }),
  onSuccess: (res, stop) => console.log('onSuccess', res),
  onError: (res, stop) => console.log('onError', res),
  onComplete: (stop) => console.log('onComplete'),
  interval: 500,
  maxTimeouts: 5,
  autoStart: true,
});

setTimeout(() => {
  console.log('Stopping polling after 4 seconds...');
  polling.stop();
}, 4_000);

function generateRequest(config) {
  const delay = config?.delay ?? 0;
  const errPercentage = config?.errPercentage ?? 0;

  return new Promise((ok, ko) => {
    setTimeout(() => {
      if (Math.random() <= errPercentage) {
        ko(500);
      } else {
        ok(200);
      }
    }, delay);
  });
}
