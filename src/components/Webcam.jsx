// components/Webcam.jsx
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

  return <video ref={videoRef} autoPlay muted className="w-full rounded-lg" />;
}

export default Webcam;
