import React from "react";

function ProcessedFeed() {
  return (
    <div className="">
      <img
        src="http://localhost:5000/video_feed"
        alt="Processed Feed"
        className="rounded-lg shadow-xl "
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      {/* <div className="absolute inset-0 bg-red-500 bg-opacity-50 hidden group-hover:flex items-center justify-center rounded-lg">
        <p className="text-white text-lg font-semibold">Feed disconnected</p>
      </div> */}
    </div>
  );
}

export default ProcessedFeed;
