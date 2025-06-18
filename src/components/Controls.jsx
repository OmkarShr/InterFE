import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faSyncAlt,
  faExpand,
  faChartLine,
  faSpinner,
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Session Controls</h3>
        <div className="text-sm text-slate-500">Manage monitoring session</div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={startCamera}
          disabled={isStreaming}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md ${
            isStreaming
              ? "hidden"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <FontAwesomeIcon icon={faPlay} />
          Start Monitoring
        </button>

        <button
          onClick={stopCamera}
          disabled={!isStreaming}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md ${
            !isStreaming
              ? "hidden"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          <FontAwesomeIcon icon={faStop} />
          End Session
        </button>

        <button
          onClick={fetchStats}
          disabled={isRefreshing}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-semibold transition-all shadow-sm hover:shadow-md"
        >
          {isRefreshing ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faSyncAlt} />
          )}
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>

        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon icon={faExpand} />
          Fullscreen
        </button>

        <a
          href="http://localhost:5000/stats"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <FontAwesomeIcon icon={faChartLine} />
          Raw Analytics
        </a>
      </div>
    </div>
  );
}

export default Controls;