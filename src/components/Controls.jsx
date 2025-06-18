// components/Controls.jsx
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
    <div className="flex flex-wrap justify-center gap-5 mt-8">
      <button
        onClick={startCamera}
        disabled={isStreaming}
        className={`flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 ${
          isStreaming
            ? "hidden"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        }`}
      >
        <FontAwesomeIcon icon={faPlay} />
        Start Camera
      </button>

      <button
        onClick={stopCamera}
        disabled={!isStreaming}
        className={`flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 ${
          !isStreaming
            ? "hidden"
            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        }`}
      >
        <FontAwesomeIcon icon={faStop} />
        Stop Camera
      </button>

      <button
        onClick={fetchStats}
        disabled={isRefreshing}
        className="flex items-center gap-2 px-7 py-3 rounded-full bg-gray-800 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
      >
        {isRefreshing ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faSyncAlt} />
        )}
        {isRefreshing ? "Refreshing..." : "Refresh Stats"}
      </button>

      <button
        onClick={toggleFullscreen}
        className="flex items-center gap-2 px-7 py-3 rounded-full bg-gray-800 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
      >
        <FontAwesomeIcon icon={faExpand} />
        Fullscreen
      </button>

      <a
        href="http://localhost:5000/stats"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-7 py-3 rounded-full bg-gray-800 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
      >
        <FontAwesomeIcon icon={faChartLine} />
        Raw Data
      </a>
    </div>
  );
}

export default Controls;
