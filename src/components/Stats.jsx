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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStreaming, fetchStats]);

  const getRiskColor = (score) => {
    if (score > 70) return "text-red-600";
    if (score > 30) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskBgColor = (score) => {
    if (score > 70) return "bg-red-50 border-red-200";
    if (score > 30) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Session Analytics</h2>
        <div className="text-sm text-slate-500">Real-time monitoring data</div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <FontAwesomeIcon icon={faTachometerAlt} className="text-2xl text-blue-600 mb-3" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.fps || 0}</div>
          <div className="text-sm text-slate-600">Frames/Second</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <FontAwesomeIcon icon={faFilm} className="text-2xl text-indigo-600 mb-3" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.frames_processed || 0}</div>
          <div className="text-sm text-slate-600">Frames Processed</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <FontAwesomeIcon icon={faUsers} className="text-2xl text-purple-600 mb-3" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.detections_count || 0}</div>
          <div className="text-sm text-slate-600">Participants Detected</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          <FontAwesomeIcon icon={faClock} className="text-2xl text-teal-600 mb-3" />
          <div className="text-2xl font-bold text-slate-800 mb-1">{stats.uptime || 0}</div>
          <div className="text-sm text-slate-600">Session Duration (s)</div>
        </div>
      </div>

      {/* Behavioral Analysis */}
      {cheatingFlags && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Behavioral Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className={`p-4 rounded-lg border-2 transition-all ${
              cheatingFlags.is_looking_away 
                ? "bg-yellow-50 border-yellow-200" 
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon 
                  icon={faEyeSlash} 
                  className={`text-xl ${
                    cheatingFlags.is_looking_away ? "text-yellow-600" : "text-slate-400"
                  }`} 
                />
                <div>
                  <div className="font-medium text-slate-800">Attention Status</div>
                  <div className={`text-sm ${
                    cheatingFlags.is_looking_away ? "text-yellow-700" : "text-slate-600"
                  }`}>
                    {cheatingFlags.is_looking_away ? "Looking Away" : "Focused"}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                ? "bg-yellow-50 border-yellow-200"
                : cheatingFlags.alert_level === "CHEATING_DETECTED"
                ? "bg-red-50 border-red-200"
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className={`text-xl ${
                    cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                      ? "text-yellow-600"
                      : cheatingFlags.alert_level === "CHEATING_DETECTED"
                      ? "text-red-600"
                      : "text-slate-400"
                  }`} 
                />
                <div>
                  <div className="font-medium text-slate-800">Alert Level</div>
                  <div className={`text-sm ${
                    cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                      ? "text-yellow-700"
                      : cheatingFlags.alert_level === "CHEATING_DETECTED"
                      ? "text-red-700"
                      : "text-slate-600"
                  }`}>
                    {cheatingFlags.alert_level?.replace("_", " ") || "Normal"}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              getRiskBgColor(cheatingFlags.suspicion_score || 0)
            }`}>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon 
                  icon={faShieldAlt} 
                  className={`text-xl ${getRiskColor(cheatingFlags.suspicion_score || 0)}`} 
                />
                <div>
                  <div className="font-medium text-slate-800">Risk Assessment</div>
                  <div className={`text-sm font-semibold ${getRiskColor(cheatingFlags.suspicion_score || 0)}`}>
                    {cheatingFlags.suspicion_score?.toFixed(0) || 0}% Risk Level
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;