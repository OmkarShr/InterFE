import React, { useRef, useEffect } from "react";
import useCameraStore from "../store/cameraStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash, faStar } from "@fortawesome/free-solid-svg-icons";

function Webcam() {
  const videoRef = useRef(null);
  const { isStreaming, startCamera, stopCamera } = useCameraStore();
  const intervalRef = useRef(null);

  const captureAndSendFrame = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    try {
      const base64Image = canvas.toDataURL("image/jpeg", 0.8);
      await fetch("http://localhost:5000/upload_frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
    } catch (error) {
      console.error("Frame upload error:", error);
    }
  };

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        intervalRef.current = setInterval(captureAndSendFrame, 100);
      } catch (error) {
        console.error("Camera error:", error);
        stopCamera();
      }
    };

    if (isStreaming) {
      initCamera();
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isStreaming]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isStreaming ? (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            className="w-full h-full object-cover rounded-2xl shadow-2xl" 
          />
          {/* Enhanced live indicator */}
          <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-3 shadow-2xl border-2 border-white/20">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
            <span className="text-lg">LIVE</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-violet-200 space-y-8 p-10">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-2 border-slate-600/50">
            <FontAwesomeIcon icon={faVideoSlash} className="text-3xl text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-3">Camera Standby</p>
            <p className="text-lg text-violet-300 font-semibold">Click "Initiate Neural Monitoring" to begin elite session</p>
          </div>
          <div className="flex items-center space-x-3 text-violet-400">
            <FontAwesomeIcon icon={faStar} />
            <span className="font-semibold">Ready for professional neural monitoring</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Webcam;