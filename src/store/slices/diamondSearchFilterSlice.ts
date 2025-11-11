import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DiamondSearchFilterState {
  viewType?: string;
  isFilterOpen?: boolean;
  isAdvanceFilterOpen?: boolean;
  filters?: {
    isFancyActive?: boolean;
    carat?: number[];
    cut?: string;
    color?: string;
    fancy_color?: string;
    clarity?: string;
    shape?: string;
    fluorescence?: string;
    table?: number[];
    depth?: number[];
    polish?: string;
    symmetry?: string;
    lab?: string;
    sort_field?: string;
    sort_order?: "asc" | "desc";
    diamond_type?: "natural" | "lab_grown";
    token?: string;
    price?: number[];
  };
}

const initialState: DiamondSearchFilterState = {
  viewType: "grid",
  isFilterOpen: true,
  isAdvanceFilterOpen: false,
  filters: {},
};

export const diamondSearchFilterSlice = createSlice({
  name: "diamondSearchFilter",
  initialState,
  reducers: {
    updateView: (state, action) => {
      state.viewType = action.payload;
    },
    setIsFancyActive: (state, action) => {
      state.filters.isFancyActive = action.payload;
    },
    toggleFilterOpen: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    toggleAdvanceFilterOpen: (state) => {
      state.isAdvanceFilterOpen = !state.isAdvanceFilterOpen;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<DiamondSearchFilterState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // 👇 Add this for setting filters from config
    resetFilters: (
      state,
      action: PayloadAction<{
        filterOptions: Record<string, any>;
        defaultFilters: Record<string, any>;
      }>
    ) => {
      const { filterOptions, defaultFilters } = action.payload;
      const newFilters: Record<string, any> = {};

      for (const key in filterOptions) {
        newFilters[key] = defaultFilters[key];
      }

      state.filters = newFilters;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateView,
  setIsFancyActive,
  toggleFilterOpen,
  toggleAdvanceFilterOpen,
  setFilters,
  resetFilters,
} = diamondSearchFilterSlice.actions;

export default diamondSearchFilterSlice.reducer;
