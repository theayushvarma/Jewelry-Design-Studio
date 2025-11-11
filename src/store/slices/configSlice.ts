import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  data: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  filterOptions: Record<string, any>; // Directly from API response
  defaultFilters: Record<string, any>; // Default values based on response
}

const initialState: ConfigState = {
  data: null,
  token: null,
  loading: false,
  error: null,
  filterOptions: {},
  defaultFilters: {},
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    fetchConfigStart(state) {
      state.loading = true;
      state.error = null;
    },

    fetchConfigSuccess(
      state,
      action: PayloadAction<{ data: any; token: string }>
    ) {
      const { data, token } = action.payload;
      state.data = data;
      state.token = token;
      state.loading = false;

      const allowedKeys = [
        "diamond_type",
        "cut",
        "color",
        "clarity",
        "shape",
        "fluorescence",
        "polish",
        "symmetry",
        "lab",
        "fancy_color",
        "carat",
        "price",
        "depth",
        "table",
        "sort_order",
        "sort_field",
      ];

      const filters: Record<string, any> = {};
      const defaults: Record<string, any> = {};

      allowedKeys.forEach((key) => {
        const value = data[key];

        // Skip empty or invalid array values
        if (!Array.isArray(value) || !value.length) return;

        // Always store the original array in filters
        filters[key] = [...value];

        switch (key) {
          case "diamond_type":
            if (value.includes("both")) {
              filters[key] = ["natural", "labgrown"];
              defaults[key] = ["natural"];
            } else {
              defaults[key] = [value[0]];
            }
            break;

          case "sort_order":
            defaults[key] = "asc";
            break;

          case "sort_field":
            defaults[key] = "price";
            break;

          default:
            // Set default as the first item for all other filters
            if (key == "shape" || key == "fancy_color") {
              defaults[key] = [];
            } else {
              defaults[key] = [...value];
            }
        }
      });

      filters.sort_order = "asc";
      filters.sort_field = "price";

      defaults.sort_order = "asc";
      defaults.sort_field = "price";

      state.filterOptions = filters;
      state.defaultFilters = defaults;
    },

    fetchConfigFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
      state.token = null;
      state.filterOptions = {};
      state.defaultFilters = {};
    },
  },
});

export const { fetchConfigStart, fetchConfigSuccess, fetchConfigFailure } =
  configSlice.actions;

export default configSlice.reducer;
