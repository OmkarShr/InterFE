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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faCog} className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Session Control Center</h3>
            <p className="text-slate-600">Manage and monitor your interview session</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <FontAwesomeIcon icon={faRocket} className="text-slate-600" />
          <span className="text-sm font-semibold text-slate-700">Professional Mode</span>
        </div>
      </div>

      {/* Primary Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Session Control */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Session Management</h4>
          <div className="space-y-3">
            <button
              onClick={startCamera}
              disabled={isStreaming}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faPlay} className="text-lg" />
              Start AI Monitoring
            </button>

            <button
              onClick={stopCamera}
              disabled={!isStreaming}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                !isStreaming
                  ? "hidden"
                  : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faStop} className="text-lg" />
              End Session
            </button>
          </div>
        </div>

        {/* System Controls */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">System Controls</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={fetchStats}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isRefreshing ? (
                <FontAwesomeIcon icon={faSpinner} spin className="text-sm" />
              ) : (
                <FontAwesomeIcon icon={faSyncAlt} className="text-sm" />
              )}
              <span className="text-sm">{isRefreshing ? "Sync..." : "Refresh"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faExpand} className="text-sm" />
              <span className="text-sm">Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-slate-800">Advanced Analytics</h4>
            <p className="text-sm text-slate-600 mt-1">Access detailed behavioral insights and raw data</p>
          </div>
          <a
            href="http://localhost:5000/stats"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>View Raw Analytics</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Controls;