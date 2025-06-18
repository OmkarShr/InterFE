// store/statsStore.js
import { create } from "zustand";

const useStatsStore = create((set) => ({
  stats: {},
  isRefreshing: false,
  cheatingFlags: {},
  fetchStats: async () => {
    set({ isRefreshing: true });
    try {
      const response = await fetch("http://localhost:5000/stats");
      const data = await response.json();
      set({ stats: data, cheatingFlags: data.cheating_flags || {} });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      set({ isRefreshing: false });
    }
  },
}));

export default useStatsStore;
