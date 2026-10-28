const client = require("prom-client");

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add default recommended metrics (e.g. process CPU, memory usage, event loop lag)
client.collectDefaultMetrics({
  register,
  prefix: "hms_",
});

// Custom metric: Total HTTP Requests
const httpRequestCounter = new client.Counter({
  name: "hms_http_requests_total",
  help: "Total number of HTTP requests processed",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

// Custom metric: HTTP Request Duration in seconds
const httpRequestDuration = new client.Histogram({
  name: "hms_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 5],
  registers: [register],
});

// Custom metric: In-flight requests gauge
const httpRequestsInFlight = new client.Gauge({
  name: "hms_http_requests_in_flight",
  help: "Current number of in-flight HTTP requests",
  registers: [register],
});

// Middleware to monitor requests
const requestMonitoringMiddleware = (req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }

  httpRequestsInFlight.inc();
  const start = process.hrtime();

  res.on("finish", () => {
    httpRequestsInFlight.dec();

    const diff = process.hrtime(start);
    const durationInSeconds = diff[0] + diff[1] / 1e9;
    const route = req.baseUrl || req.route?.path || req.path;
    const statusCode = res.statusCode;

    httpRequestCounter.labels(req.method, route, statusCode).inc();
    httpRequestDuration.labels(req.method, route, statusCode).observe(durationInSeconds);
  });

  next();
};

// Handler for Prometheus scrape endpoint
const metricsHandler = async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
};

module.exports = {
  requestMonitoringMiddleware,
  metricsHandler,
  register,
};
