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

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState === null) return undefined; 
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

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
  preloadedState: persistedState, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const state = store.getState();
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
