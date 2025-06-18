// store/cameraStore.js
import { create } from "zustand";
import useReportStore from './reportStore';

const useCameraStore = create((set) => ({
  isStreaming: false,
  startCamera: async () => {
    try {
      await fetch('http://localhost:5000/start', { method: 'POST' });
      set({ isStreaming: true });
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  },
  stopCamera: () => {
    set({ isStreaming: false });
    useReportStore.getState().fetchReport();
  },
}));

export default useCameraStore;
