import React, { useRef, useEffect } from "react";
import useCameraStore from "../store/cameraStore";

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
    <div className="w-full h-full flex items-center justify-center">
      {isStreaming ? (
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          className="w-full h-full object-cover rounded-lg shadow-sm" 
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-400 space-y-3">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm font-medium">Camera Inactive</p>
          <p className="text-xs">Click "Start Monitoring" to begin</p>
        </div>
      )}
    </div>
  );
}

export default Webcam;