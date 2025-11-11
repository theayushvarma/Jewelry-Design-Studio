import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Diamond {
  [key: string]: any;
}

interface DiamondState {
  data: Diamond[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  limit:Number;
  error: string | null;
  page: number;
  total: number;
}

interface DiamondPayload {
  data: Diamond[];
  total: number;
  page: number;
  last_page: number;
  current_page: number;
}

interface AppendPayload extends DiamondPayload {}

const initialState: DiamondState = {
  data: [],
  loading: false,
  loadingMore: false,
  hasMore: false,
  limit:12,
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
      state.page = 1;
      state.total = 0;
    },
    fetchMoreStart(state) {
      state.loading = false;
      state.loadingMore = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<DiamondPayload>) {
      state.loading = false;
      state.loadingMore = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.hasMore = action.payload.last_page > action.payload.current_page;
    },
    appendData(state, action: PayloadAction<AppendPayload>) {
      state.data = [...state.data, ...action.payload.data];
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
      state.hasMore = action.payload.last_page > action.payload.current_page;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.data = [];
      state.loading = false;
      state.loadingMore = false;
      state.page = 1;
      state.total = 0;
      state.error = action.payload;
      state.hasMore = false;
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
