import { createPolling } from './promise-polling.mjs';

const polling = createPolling({
  source: () =>
    generateFakeRequest({
      delay: 500,
      errPercentage: 0.75,
      okValue: 'yep',
      errValue: 'nope',
    }),
  onSuccess: (res, stop) => console.log('onSuccess', res),
  onError: (res, stop) => console.log('onError', res),
  onComplete: (stop) => console.log('onComplete'),
  interval: 550,
  maxTimeouts: 5,
  immediate: true,
});

console.log('Started polling...');
polling.start();

setTimeout(() => {
  console.log('Stopped polling after 4 seconds...');
  polling.stop();
}, 2_000);

function generateFakeRequest(config) {
  const delay = config?.delay ?? 0;
  const errPercentage = config?.errPercentage ?? 0;
  const okValue = config?.okValue;
  const errValue = config?.errValue;

  return new Promise((ok, ko) => {
    setTimeout(() => {
      if (Math.random() <= errPercentage) {
        ko(errValue);
      } else {
        ok(okValue);
      }
    }, delay);
  });
}
