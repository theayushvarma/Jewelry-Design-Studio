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

      if (!newItem?.id) return;

      state.items = state.items.filter(
        (item) => !!item?.id
      );

      const existing = state.items.find((item) => item.id === newItem.id);

      if (!existing) {
        state.items = [newItem, ...state.items].slice(0, 20);
      } else {
        state.items = [
          newItem,
          ...state.items.filter((item) => item.id !== newItem.id),
        ].slice(0, 20);
      }

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
