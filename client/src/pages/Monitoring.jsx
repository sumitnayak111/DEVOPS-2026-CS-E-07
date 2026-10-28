import { FaChartLine, FaFire, FaServer, FaExternalLinkAlt } from "react-icons/fa";

function Monitoring() {
  const grafanaUrl = "http://localhost:3001/d/hms-system-dashboard?orgId=1&kiosk";
  const grafanaDirectUrl = "http://localhost:3001/d/hms-system-dashboard";
  const prometheusUrl = "http://localhost:9090";
  const metricsUrl = "http://localhost:8000/metrics";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FaChartLine className="text-indigo-600" />
              Observability & System Monitoring
            </h1>
            <p className="text-gray-500 mt-1">
              Real-time infrastructure and application performance monitoring powered by Prometheus and Grafana.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={grafanaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Open Grafana (3001) <FaExternalLinkAlt size={14} />
            </a>
            <a
              href={prometheusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition"
            >
              Open Prometheus (9090) <FaExternalLinkAlt size={14} />
            </a>
            <a
              href={metricsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Raw Metrics (8000) <FaExternalLinkAlt size={14} />
            </a>
          </div>
        </div>

        {/* Quick Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-600 border-t border-r border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Grafana Dashboard</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Visualization for request rate, latency (p95/p50), error codes, memory & CPU usage.
                </p>
              </div>
              <FaChartLine className="text-indigo-600" size={32} />
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">Port: <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700 font-semibold">3001</code></span>
              <a
                href={grafanaDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500 border-t border-r border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Prometheus Server</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Time-series metrics scraper, PromQL query explorer, and target health monitor.
                </p>
              </div>
              <FaFire className="text-orange-500" size={32} />
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">Port: <code className="bg-gray-100 px-1 py-0.5 rounded text-orange-700 font-semibold">9090</code></span>
              <a
                href={prometheusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500 border-t border-r border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Backend API Metrics</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Live Prometheus-formatted metrics exposed directly by the Express Node.js application.
                </p>
              </div>
              <FaServer className="text-emerald-500" size={32} />
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">Port: <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-700 font-semibold">8000/metrics</code></span>
              <a
                href={metricsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Inspect <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Dashboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-700 flex items-center gap-2">
              <FaChartLine className="text-indigo-600" />
              Live Grafana Preview
            </h2>
            <a
              href={grafanaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1"
            >
              Open Full Screen <FaExternalLinkAlt size={12} />
            </a>
          </div>
          <div className="w-full h-[650px] bg-gray-900 relative">
            <iframe
              src={grafanaUrl}
              title="Grafana Dashboard"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitoring;
