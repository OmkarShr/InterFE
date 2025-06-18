import React from "react";

function ProcessedFeed() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="http://localhost:5000/video_feed"
        alt="AI Analysis Feed"
        className="w-full h-full object-cover rounded-lg shadow-sm"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden flex-col items-center justify-center text-slate-400 space-y-3">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium">Analysis Inactive</p>
        <p className="text-xs">Waiting for video feed</p>
      </div>
    </div>
  );
}

export default ProcessedFeed;