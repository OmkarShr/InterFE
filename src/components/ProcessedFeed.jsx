import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faRobot } from "@fortawesome/free-solid-svg-icons";

function ProcessedFeed() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <img
        src="http://localhost:5000/video_feed"
        alt="AI Analysis Feed"
        className="w-full h-full object-cover rounded-xl shadow-lg"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden flex-col items-center justify-center text-slate-500 space-y-6 p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-2xl flex items-center justify-center shadow-lg">
          <FontAwesomeIcon icon={faBrain} className="text-2xl text-purple-600" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-600 mb-2">AI Analysis Standby</p>
          <p className="text-sm text-slate-500">Waiting for video feed to begin processing</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <FontAwesomeIcon icon={faRobot} />
          <span>Advanced behavioral analysis ready</span>
        </div>
      </div>
    </div>
  );
}

export default ProcessedFeed;