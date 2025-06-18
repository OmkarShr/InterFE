// store/controlsStore.js
import { create } from "zustand";

const useControlsStore = create((set) => ({
  isRefreshing: false,
  fetchStats: async () => {
    set({ isRefreshing: true });
    try {
      const response = await fetch("http://localhost:5000/stats");
      return await response.json();
    } catch (error) {
      console.error("Stats fetch error:", error);
      return null;
    } finally {
      set({ isRefreshing: false });
    }
  },
}));

export default useControlsStore;
