/**
 * Logging and Debugging Middleware
 * Formats incoming HTTP requests with timestamps, HTTP method, URL, and response latency.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color =
      status >= 500
        ? '\x1b[31m' // Red
        : status >= 400
        ? '\x1b[33m' // Yellow
        : status >= 300
        ? '\x1b[36m' // Cyan
        : '\x1b[32m'; // Green

    console.log(
      `[${timestamp}] ${color}${req.method}\x1b[0m ${req.originalUrl} ${color}${status}\x1b[0m (${duration}ms)`
    );
  });

  next();
};

