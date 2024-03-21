// timerWorker.ts
let duration = 0;
let interval: NodeJS.Timeout;

self.onmessage = function (e: MessageEvent) {
  if (e.data === "start") {
    interval = setInterval(() => {
      duration += 10;
      postMessage(duration);
    }, 10);
  } else if (e.data === "stop") {
    clearInterval(interval);
  }
};
