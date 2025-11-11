// src/store/slices/compareSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiamondItem {
  id: string | number;
  certificate_no?: string;
  diamond_type?: string;
  [key: string]: any;
}

interface CompareState {
  items: DiamondItem[];
}

const initialState: CompareState = {
  items: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<DiamondItem>) => {
      const exists = state.items.find((d) => d.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromCompare: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    toggleCompare: (state, action: PayloadAction<DiamondItem>) => {
      const exists = state.items.find((d) => d.id === action.payload.id);
      if (exists)
        state.items = state.items.filter((d) => d.id !== action.payload.id);
      else state.items.push(action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, toggleCompare, clearCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
