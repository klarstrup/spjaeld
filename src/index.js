const callAndSetInterval = (fn, delay) => {
  fn();
  return setInterval(fn, delay);
};

const processQueue = (fun, { context, parameters, resolver, rejecter }) => {
  try {
    resolver(fun.apply(context, parameters));
  } catch (err) {
    rejecter(err);
  }
};

const rateLimitFn = (fun, delay = 300) => {
  const queue = [];
  let timer = null;
  function doProcessQueue() {
    if (queue.length) {
      processQueue(fun, queue.shift());
    } else {
      timer = clearInterval(timer);
    }
  }

  return function rateLimitedFn(...parameters) {
    let resolver;
    let rejecter;
    const invocationPromise = new Promise((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    });
    queue.push({ context: this, parameters, resolver, rejecter });
    if (!timer) timer = callAndSetInterval(doProcessQueue, delay);

    return invocationPromise;
  };
};

export default rateLimitFn;
