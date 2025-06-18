import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faSyncAlt,
  faExpand,
  faChartLine,
  faSpinner,
  faRocket,
  faCog,
  faBrain,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import useCameraStore from "../store/cameraStore";
import useStatsStore from "../store/statsStore";

function Controls() {
  const { isStreaming, startCamera, stopCamera } = useCameraStore();
  const { isRefreshing, fetchStats } = useStatsStore();

  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
            <FontAwesomeIcon icon={faCog} className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">Mission Control Center</h3>
            <p className="text-slate-600 text-lg">Advanced session management and monitoring controls</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-3 rounded-2xl border border-slate-200 shadow-lg">
          <FontAwesomeIcon icon={faRocket} className="text-slate-600" />
          <span className="text-sm font-bold text-slate-700">Professional Mode</span>
        </div>
      </div>

      {/* Primary Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Session Control */}
        <div className="bg-gradient-to-br from-slate-50/80 to-slate-100/80 rounded-3xl p-8 border border-slate-200 shadow-xl backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faBrain} className="text-white text-xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">AI Session Management</h4>
          </div>
          <div className="space-y-4">
            <button
              onClick={startCamera}
              disabled={isStreaming}
              className={`w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg ${
                isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faPlay} className="text-xl" />
              Start Neural Monitoring
            </button>

            <button
              onClick={stopCamera}
              disabled={!isStreaming}
              className={`w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg ${
                !isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:via-rose-700 hover:to-red-800 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faStop} className="text-xl" />
              End Session & Generate Report
            </button>
          </div>
        </div>

        {/* System Controls */}
        <div className="bg-gradient-to-br from-slate-50/80 to-slate-100/80 rounded-3xl p-8 border border-slate-200 shadow-xl backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faShieldAlt} className="text-white text-xl" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">System Operations</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={fetchStats}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isRefreshing ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
              ) : (
                <FontAwesomeIcon icon={faSyncAlt} className="text-lg" />
              )}
              <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faExpand} className="text-lg" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-3xl p-8 border border-blue-200 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faChartLine} className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">Advanced Analytics Dashboard</h4>
              <p className="text-slate-600 mt-1">Access comprehensive behavioral insights and raw telemetry data</p>
            </div>
          </div>
          <a
            href="http://localhost:5000/stats"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <FontAwesomeIcon icon={faChartLine} className="text-xl" />
            <span>Open Analytics Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Controls;