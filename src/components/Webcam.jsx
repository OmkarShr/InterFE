import React, { useRef, useEffect } from "react";
import useCameraStore from "../store/cameraStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

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
            className="w-full h-full object-cover rounded-xl shadow-lg" 
          />
          {/* Live indicator */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-500 space-y-6 p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-lg">
            <FontAwesomeIcon icon={faVideoSlash} className="text-2xl text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-600 mb-2">Camera Standby</p>
            <p className="text-sm text-slate-500">Click "Start AI Monitoring" to begin session</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <FontAwesomeIcon icon={faVideo} />
            <span>Ready for professional monitoring</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Webcam;