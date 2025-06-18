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
  faStar,
  faGem,
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
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
            <FontAwesomeIcon icon={faCog} className="text-white text-3xl" />
          </div>
          <div>
            <h3 className="text-4xl font-black text-white mb-2">Neural Command Center</h3>
            <p className="text-violet-200 text-xl font-semibold">Advanced session orchestration and intelligence monitoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl px-8 py-4 rounded-2xl border border-violet-400/30 shadow-2xl">
          <FontAwesomeIcon icon={faGem} className="text-violet-400 text-lg" />
          <span className="text-lg font-bold text-violet-200">Elite Mode</span>
        </div>
      </div>

      {/* Primary Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Session Control */}
        <div className="bg-gradient-to-br from-white/10 to-violet-500/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-violet-400/30 shadow-2xl">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <FontAwesomeIcon icon={faBrain} className="text-white text-2xl" />
            </div>
            <h4 className="text-2xl font-black text-white">AI Session Control</h4>
          </div>
          <div className="space-y-6">
            <button
              onClick={startCamera}
              disabled={isStreaming}
              className={`w-full flex items-center justify-center gap-5 px-10 py-6 rounded-2xl font-bold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-xl ${
                isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 hover:from-emerald-600 hover:via-green-700 hover:to-emerald-800 text-white border-2 border-emerald-400/30"
              }`}
            >
              <FontAwesomeIcon icon={faPlay} className="text-2xl" />
              Initiate Neural Monitoring
            </button>

            <button
              onClick={stopCamera}
              disabled={!isStreaming}
              className={`w-full flex items-center justify-center gap-5 px-10 py-6 rounded-2xl font-bold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-xl ${
                !isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-red-500 via-rose-600 to-red-700 hover:from-red-600 hover:via-rose-700 hover:to-red-800 text-white border-2 border-red-400/30"
              }`}
            >
              <FontAwesomeIcon icon={faStop} className="text-2xl" />
              Terminate & Generate Report
            </button>
          </div>
        </div>

        {/* System Controls */}
        <div className="bg-gradient-to-br from-white/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-blue-400/30 shadow-2xl">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <FontAwesomeIcon icon={faShieldAlt} className="text-white text-2xl" />
            </div>
            <h4 className="text-2xl font-black text-white">System Operations</h4>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={fetchStats}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border border-blue-400/30"
            >
              {isRefreshing ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-xl" />
              ) : (
                <FontAwesomeIcon icon={faSyncAlt} className="text-xl" />
              )}
              <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border border-violet-400/30"
            >
              <FontAwesomeIcon icon={faExpand} className="text-xl" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="bg-gradient-to-br from-white/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-indigo-400/30 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-18 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20">
              <FontAwesomeIcon icon={faChartLine} className="text-white text-2xl" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white mb-2">Advanced Analytics Portal</h4>
              <p className="text-indigo-200 text-lg font-semibold">Access comprehensive behavioral insights and neural telemetry data</p>
            </div>
          </div>
          <a
            href="http://localhost:5000/stats"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-700 hover:from-indigo-600 hover:via-purple-700 hover:to-violet-800 text-white font-bold transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 border-2 border-indigo-400/30"
          >
            <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
            <span className="text-xl">Launch Analytics Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Controls;