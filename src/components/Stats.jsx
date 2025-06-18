import React, { useEffect } from "react";
import useStatsStore from "../store/statsStore";
import useCameraStore from "../store/cameraStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faExclamationTriangle,
  faShieldAlt,
  faBrain,
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
    if (score > 70) return "bg-gradient-to-br from-red-50 to-red-100 border-red-200";
    if (score > 30) return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200";
    return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
  };

  const getRiskLabel = (score) => {
    if (score > 70) return "High Risk";
    if (score > 30) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Behavioral Analysis</h2>
          <p className="text-slate-600 mt-1">Real-time candidate monitoring and assessment</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
          <FontAwesomeIcon icon={faBrain} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-700">AI Engine Active</span>
        </div>
      </div>

      {/* Main Risk Assessment Card */}
      {cheatingFlags && (
        <div className={`rounded-2xl border-2 p-8 transition-all duration-300 ${
          getRiskBgColor(cheatingFlags.suspicion_score || 0)
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                cheatingFlags.suspicion_score > 70 
                  ? "bg-red-600" 
                  : cheatingFlags.suspicion_score > 30 
                  ? "bg-yellow-600" 
                  : "bg-green-600"
              }`}>
                <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Risk Assessment</h3>
                <p className="text-slate-600">Comprehensive behavioral analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getRiskColor(cheatingFlags.suspicion_score || 0)}`}>
                {cheatingFlags.suspicion_score?.toFixed(0) || 0}%
              </div>
              <div className={`text-lg font-semibold ${getRiskColor(cheatingFlags.suspicion_score || 0)}`}>
                {getRiskLabel(cheatingFlags.suspicion_score || 0)}
              </div>
            </div>
          </div>

          {/* Risk Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Risk Level</span>
              <span>{cheatingFlags.suspicion_score?.toFixed(1) || 0}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  cheatingFlags.suspicion_score > 70 
                    ? "bg-gradient-to-r from-red-500 to-red-600" 
                    : cheatingFlags.suspicion_score > 30 
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600" 
                    : "bg-gradient-to-r from-green-500 to-green-600"
                }`}
                style={{ width: `${Math.min(cheatingFlags.suspicion_score || 0, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Behavioral Indicators */}
      {cheatingFlags && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Attention Monitoring */}
          <div className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
            cheatingFlags.is_looking_away 
              ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100" 
              : "border-slate-200 hover:border-slate-300"
          }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                cheatingFlags.is_looking_away 
                  ? "bg-yellow-600" 
                  : "bg-slate-600"
              }`}>
                <FontAwesomeIcon 
                  icon={faEyeSlash} 
                  className="text-xl text-white" 
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">Attention Monitoring</h4>
                <p className="text-sm text-slate-600">Eye tracking and focus analysis</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Current Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                cheatingFlags.is_looking_away 
                  ? "bg-yellow-200 text-yellow-800" 
                  : "bg-green-200 text-green-800"
              }`}>
                {cheatingFlags.is_looking_away ? "Distracted" : "Focused"}
              </span>
            </div>
          </div>

          {/* Behavioral Analysis */}
          <div className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
            cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
              ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100"
              : cheatingFlags.alert_level === "CHEATING_DETECTED"
              ? "border-red-200 bg-gradient-to-br from-red-50 to-red-100"
              : "border-slate-200 hover:border-slate-300"
          }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                  ? "bg-yellow-600"
                  : cheatingFlags.alert_level === "CHEATING_DETECTED"
                  ? "bg-red-600"
                  : "bg-slate-600"
              }`}>
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="text-xl text-white" 
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">Behavioral Analysis</h4>
                <p className="text-sm text-slate-600">Pattern recognition and anomaly detection</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Alert Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                cheatingFlags.alert_level === "SUSPICIOUS_BEHAVIOR"
                  ? "bg-yellow-200 text-yellow-800"
                  : cheatingFlags.alert_level === "CHEATING_DETECTED"
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
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