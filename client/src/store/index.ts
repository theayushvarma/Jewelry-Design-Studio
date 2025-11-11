import { configureStore } from "@reduxjs/toolkit";
import diamondSearchFilterReducer from "./slices/diamondSearchFilterSlice";
import diamondSearchApiSlice from "./slices/diamondSearchApiSlice";
import settingSearchApiSlice from "./slices/settingSearchApiSlice";
import configSlice from "./slices/configSlice";
import diamondInquirySlice from "./slices/diamondInquirySlice";
import shareOnEmailSlice from "./slices/shareOnEmailSlice";
import compareReducer from "./slices/compareSlice";
import recentlyViewedReducer from "./slices/recentlyViewedSlice";
import diamondRingSelectionReducer from "./slices/diamondRingSelectionSlice";

// --- ✅ Load persisted state from sessionStorage ---
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState === null) return undefined; // no previous state
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

// --- ✅ Save state to sessionStorage ---
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

// ✅ Load persisted state before creating store
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    diamondSearchFilter: diamondSearchFilterReducer,
    diamondSearchApi: diamondSearchApiSlice,
    settingSearchApi: settingSearchApiSlice,
    config: configSlice,
    diamondInquiry: diamondInquirySlice,
    shareOnEmail: shareOnEmailSlice,
    compare: compareReducer,
    recentlyViewed: recentlyViewedReducer,
    diamondRingSelection: diamondRingSelectionReducer,
  },
  preloadedState: persistedState, // 🧠 restore saved state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Automatically save the store to sessionStorage on every change
store.subscribe(() => {
  const state = store.getState();
  // You can choose to persist only specific slices:
  const stateToPersist = {
    diamondSearchFilter: state.diamondSearchFilter,
    diamondSearchApi: state.diamondSearchApi,
    settingSearchApi: state.settingSearchApi,
    config: state.config,
    diamondInquiry: state.diamondInquiry,
    shareOnEmail: state.shareOnEmail,
    compare: state.compare,
    recentlyViewed: state.recentlyViewed,
    diamondRingSelection: state.diamondRingSelection,
  };
  saveState(stateToPersist);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
