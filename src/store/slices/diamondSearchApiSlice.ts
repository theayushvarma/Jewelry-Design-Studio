import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Diamond {
  [key: string]: any;
}

interface DiamondState {
  data: Diamond[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: DiamondState = {
  data: [],
  loading: false,
  loadingMore: false,
  hasMore: false,
  error: null,
  page: 1,
  total: 0,
};

const diamondSearchApiSlice = createSlice({
  name: "diamondSearchApi",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.loadingMore = false;
      state.error = null;
      state.data = [];
      state.hasMore = false;
      state.error = null;
      state.page = 1;
      state.total = 0;
    },
    fetchMoreStart(state) {
      state.loading = false;
      state.loadingMore = true;
      state.error = null;
    },
    fetchSuccess(
      state,
      action: PayloadAction<{ data: Diamond[]; total: number; page: number }>
    ) {
      state.loading = false;
      state.loadingMore = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.hasMore = action.payload.last_page > action.payload.current_page;
    },
    appendData(
      state,
      action: PayloadAction<{ data: Diamond[]; page: number }>
    ) {
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.page;
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
      state.total = action.payload.total;
      state.hasMore = action.payload.last_page > action.payload.current_page;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.data = [];
      state.loading = false;
      state.loadingMore = false;
      state.page = 1;
      state.total = 0;
      state.error = action.payload;
      state.hasMore = action.payload.last_page > action.payload.current_page;
    },
    resetData() {
      return initialState;
    },
  },
});

export const {
  fetchStart,
  fetchMoreStart,
  fetchSuccess,
  appendData,
  fetchFailure,
  resetData,
} = diamondSearchApiSlice.actions;

export default diamondSearchApiSlice.reducer;
