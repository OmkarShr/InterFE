import React, { useEffect } from "react";
import useStatsStore from "../store/statsStore";
import useCameraStore from "../store/cameraStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faExclamationTriangle,
  faShieldAlt,
  faBrain,
  faGem,
  faStar,
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
    if (score > 70) return "text-red-400";
    if (score > 30) return "text-yellow-400";
    return "text-emerald-400";
  };

  const getRiskBgColor = (score) => {
    if (score > 70) return "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400/30";
    if (score > 30) return "bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-400/30";
    return "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-400/30";
  };

  const getRiskLabel = (score) => {
    if (score > 70) return "High Risk";
    if (score > 30) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Neural Behavioral Analysis</h2>
          <p className="text-violet-200 text-xl font-semibold">Real-time candidate intelligence and risk assessment</p>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl px-6 py-3 rounded-2xl border border-violet-400/30 shadow-xl">
          <FontAwesomeIcon icon={faBrain} className="text-violet-400 text-lg" />
          <span className="text-lg font-bold text-violet-200">AI Engine Active</span>
        </div>
      </div>

      {/* Main Risk Assessment Card */}
      {cheatingFlags && (
        <div className={`rounded-3xl border-2 p-10 transition-all duration-500 backdrop-blur-xl shadow-2xl ${
          getRiskBgColor(cheatingFlags.suspicion_score || 0)
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/20 ${
                cheatingFlags.suspicion_score > 70 
                  ? "bg-gradient-to-br from-red-500 to-red-600" 
                  : cheatingFlags.suspicion_score > 30 
                  ? "bg-gradient-to-br from-yellow-500 to-yellow-600" 
                  : "bg-gradient-to-br from-emerald-500 to-green-600"
              }`}>
                <FontAwesomeIcon icon={faShieldAlt} className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-2">Risk Assessment</h3>
                <p className="text-violet-200 text-lg font-semibold">Comprehensive behavioral intelligence analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-6xl font-black mb-2 ${getRiskColor(cheatingFlags.suspicion_score || 0)}`}>
                {cheatingFlags.suspicion_score?.toFixed(0) || 0}%
              </div>
              <div className={`text-2xl font-bold ${getRiskColor(cheatingFlags.suspicion_score || 0)}`}>
                {getRiskLabel(cheatingFlags.suspicion_score || 0)}
              </div>
            </div>
          </div>

          {/* Enhanced Risk Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-lg text-violet-200 mb-4">
              <span className="font-semibold">Risk Level</span>
              <span className="font-bold">{cheatingFlags.suspicion_score?.toFixed(1) || 0}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-4 shadow-inner">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 shadow-lg ${
                  cheatingFlags.suspicion_score > 70 
                    ? "bg-gradient-to-r from-red-500 via-red-600 to-rose-600" 
                    : cheatingFlags.suspicion_score > 30 
                    ? "bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600" 
                    : "bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600"
                }`}
                style={{ width: `${Math.min(cheatingFlags.suspicion_score || 0, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Behavioral Indicators */}
      {cheatingFlags && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Attention Monitoring */}
          <div className={`bg-white/10 backdrop-blur-xl rounded-3xl border-2 p-8 transition-all duration-500 hover:shadow-2xl shadow-xl ${
            cheatingFlags.is_looking_away 
              ? "border-yellow-400/40 bg-gradient-to-br from-yellow-500/10 to-amber-500/10" 
              : "border-violet-400/30 hover:border-violet-400/50"
          }`}>
            <div className="flex items-center space-x-6 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 ${
                cheatingFlags.is_looking_away 
                  ? "bg-gradient-to-br from-yellow-500 to-amber-600" 
                  : "bg-gradient-to-br from-violet-500 to-purple-600"
              }`}>
                <FontAwesomeIcon 
                  icon={faEyeSlash} 
                  className="text-white text-2xl" 
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Attention Monitoring</h4>
                <p className="text-violet-200 font-semibold">Advanced eye tracking and focus analysis</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-violet-200 font-semibold text-lg">Current Status:</span>
              <span className={`px-4 py-2 rounded-xl text-lg font-bold shadow-lg ${
                cheatingFlags.is_looking_away 
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30" 
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
              }`}>
                {cheatingFlags.is_looking_away ? "Distracted" : "Focused"}
              </span>
            </div>
          </div>

          {/* Behavioral Analysis */}
          <div className={`bg-white/10 backdrop-blur-xl rounded-3xl border-2 p-8 transition-all duration-500 hover:shadow-2xl shadow-xl ${
            cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
              ? "border-yellow-400/40 bg-gradient-to-br from-yellow-500/10 to-amber-500/10"
              : cheatingFlags.alert_level === "CHEATING_DETECTED"
              ? "border-red-400/40 bg-gradient-to-br from-red-500/10 to-rose-500/10"
              : "border-violet-400/30 hover:border-violet-400/50"
          }`}>
            <div className="flex items-center space-x-6 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 ${
                cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                  ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                  : cheatingFlags.alert_level === "CHEATING_DETECTED"
                  ? "bg-gradient-to-br from-red-500 to-rose-600"
                  : "bg-gradient-to-br from-violet-500 to-purple-600"
              }`}>
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="text-white text-2xl" 
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Behavioral Analysis</h4>
                <p className="text-violet-200 font-semibold">Pattern recognition and anomaly detection</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-violet-200 font-semibold text-lg">Alert Level:</span>
              <span className={`px-4 py-2 rounded-xl text-lg font-bold shadow-lg ${
                cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                  : cheatingFlags.alert_level === "CHEATING_DETECTED"
                  ? "bg-red-500/20 text-red-300 border border-red-400/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
              }`}>
                {cheatingFlags.alert_level?.replace("_", " ") || "Normal"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;