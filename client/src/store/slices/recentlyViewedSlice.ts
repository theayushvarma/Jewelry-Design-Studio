import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Diamond {
  id?: string | number;
  certificate_no: string;
  [key: string]: any;
}

interface RecentlyViewedState {
  items: Diamond[];
}

const initialState: RecentlyViewedState = {
  items: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addRecentlyViewed(state, action: PayloadAction<Diamond>) {
      const newItem = action.payload;

      // ❌ Skip if no valid id or certificate_no
      if (!newItem?.id) return;

      // 🧹 Remove any invalid/empty id entries first
      state.items = state.items.filter(
        (item) => !!item?.id
      );

      // 🔍 Check for existing entry
      const existing = state.items.find((item) => item.id === newItem.id);

      if (!existing) {
        // Add new and limit to last 20
        state.items = [newItem, ...state.items].slice(0, 20);
      } else {
        // Move existing to top
        state.items = [
          newItem,
          ...state.items.filter((item) => item.id !== newItem.id),
        ].slice(0, 20);
      }

      // 💾 Save to localStorage
      localStorage.setItem("recentlyViewed", JSON.stringify(state.items));
    },

    removeRecentlyViewed(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("recentlyViewed", JSON.stringify(state.items));
    },

    clearRecentlyViewed(state) {
      state.items = [];
      localStorage.removeItem("recentlyViewed");
    },

    loadRecentlyViewed(state) {
      const saved = localStorage.getItem("recentlyViewed");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter invalid items on load
        state.items = parsed.filter(
          (item: Diamond) => item?.id && item?.certificate_no
        );
      }
    },
  },
});

export const {
  addRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
  loadRecentlyViewed,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
