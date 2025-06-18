import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faRobot, faStar } from "@fortawesome/free-solid-svg-icons";

function ProcessedFeed() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <img
        src="http://localhost:5000/video_feed"
        alt="AI Analysis Feed"
        className="w-full h-full object-cover rounded-2xl shadow-2xl"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden flex-col items-center justify-center text-violet-200 space-y-8 p-10">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-2 border-violet-400/30">
          <FontAwesomeIcon icon={faBrain} className="text-3xl text-violet-400" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-white mb-3">Neural Analysis Standby</p>
          <p className="text-lg text-violet-300 font-semibold">Awaiting video feed for advanced behavioral processing</p>
        </div>
        <div className="flex items-center space-x-3 text-violet-400">
          <FontAwesomeIcon icon={faStar} />
          <span className="font-semibold">Elite behavioral intelligence ready</span>
        </div>
      </div>
    </div>
  );
}

export default ProcessedFeed;