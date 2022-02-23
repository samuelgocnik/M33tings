const getTimestamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.info(`[${getTimestamp()}] [INFO] [${namespace}] [${msg}]`, object);
  } else {
    console.info(`[${getTimestamp()}] [INFO] [${namespace}] [${msg}]`);
  }
};

const warn = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.info(`[${getTimestamp()}] [WARN] [${namespace}] [${msg}]`, object);
  } else {
    console.info(`[${getTimestamp()}] [WARN] [${namespace}] [${msg}]`);
  }
};

const error = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.info(`[${getTimestamp()}] [ERROR] [${namespace}] [${msg}]`, object);
  } else {
    console.info(`[${getTimestamp()}] [ERROR] [${namespace}] [${msg}]`);
  }
};

const debug = (namespace: string, msg: string, object?: any) => {
  if (object) {
    console.info(`[${getTimestamp()}] [DEBUG] [${namespace}] [${msg}]`, object);
  } else {
    console.info(`[${getTimestamp()}] [DEBUG] [${namespace}] [${msg}]`);
  }
};

export default { info, error, warn, debug };
