import React, { useEffect } from "react";
import useStatsStore from "../store/statsStore";
import useCameraStore from "../store/cameraStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFilm,
  faUsers,
  faClock,
  faEyeSlash,
  faExclamationTriangle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

function Stats() {
  const { stats, fetchStats, cheatingFlags } = useStatsStore();
  const { isStreaming } = useCameraStore();

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        fetchStats();
      }, 1000); // Fetch every second
      return () => clearInterval(interval);
    }
  }, [isStreaming, fetchStats]);

  const getRiskColor = (score) => {
    if (score > 70) return "text-red-500";
    if (score > 30) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        Live Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/10 hover:bg-white/15 p-10 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity rounded-full scale-150 group-hover:rotate-180" />
          <FontAwesomeIcon
            icon={faTachometerAlt}
            className="text-3xl text-white/70 mb-4"
          />
          <div className="text-4xl font-semibold text-white mb-2">
            {stats.fps}
          </div>
          <div className="text-base text-white/80 font-light">FPS</div>
        </div>
        <div className="bg-white/10 hover:bg-white/15 p-10 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity rounded-full scale-150 group-hover:rotate-180" />
          <FontAwesomeIcon
            icon={faFilm}
            className="text-3xl text-white/70 mb-4"
          />
          <div className="text-4xl font-semibold text-white mb-2">
            {stats.frames_processed}
          </div>
          <div className="text-base text-white/80 font-light">
            Frames Processed
          </div>
        </div>
        <div className="bg-white/10 hover:bg-white/15 p-10 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity rounded-full scale-150 group-hover:rotate-180" />
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl text-white/70 mb-4"
          />
          <div className="text-4xl font-semibold text-white mb-2">
            {stats.detections_count}
          </div>
          <div className="text-base text-white/80 font-light">Faces Detected</div>
        </div>
        <div className="bg-white/10 hover:bg-white/15 p-10 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity rounded-full scale-150 group-hover:rotate-180" />
          <FontAwesomeIcon
            icon={faClock}
            className="text-3xl text-white/70 mb-4"
          />
          <div className="text-4xl font-semibold text-white mb-2">
            {stats.uptime}
          </div>
          <div className="text-base text-white/80 font-light">Uptime (s)</div>
        </div>
      </div>
      {cheatingFlags && (
        <div className="mt-6 pt-4 border-t border-gray-700 flex justify-around items-center">
          <div
            className={`text-center p-3 rounded-lg ${
              cheatingFlags.is_looking_away ? "bg-yellow-500/20" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faEyeSlash}
              className={`text-2xl ${
                cheatingFlags.is_looking_away
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            />
            <p className="font-semibold mt-1">Looking Away</p>
          </div>
          <div
            className={`text-center p-3 rounded-lg ${
              cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                ? "bg-yellow-500/20"
                : cheatingFlags.alert_level === "CHEATING_DETECTED"
                ? "bg-red-500/20"
                : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className={`text-2xl ${
                cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                  ? "text-yellow-500"
                  : cheatingFlags.alert_level === "CHEATING_DETECTED"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            />
            <p className="font-semibold mt-1">
              {cheatingFlags.alert_level?.replace("_", " ") || "No Alert"}
            </p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className={`text-2xl ${getRiskColor(
                cheatingFlags.suspicion_score
              )}`}
            />
            <p className="font-semibold mt-1">
              Risk: {cheatingFlags.suspicion_score?.toFixed(0) || 0}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
