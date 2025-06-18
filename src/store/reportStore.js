// store/reportStore.js
import { create } from 'zustand';

const useReportStore = create((set) => ({
  reportData: null,
  isReportVisible: false,
  error: null,
  fetchReport: async () => {
    try {
      const response = await fetch('http://localhost:5000/report');
      if (!response.ok) {
        throw new Error('Failed to fetch the report.');
      }
      const data = await response.json();
      set({ reportData: data, isReportVisible: true, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
  hideReport: () => set({ isReportVisible: false, reportData: null }),
}));

export default useReportStore;
