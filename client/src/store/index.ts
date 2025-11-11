import { configureStore } from "@reduxjs/toolkit";
import { diamondSearchFilterSlice } from "./slices/diamondSearchFilterSlice";
import diamondSearchApiSlice from "./slices/diamondSearchApiSlice";
import configSlice from "./slices/configSlice";
import diamondInquirySlice from "./slices/diamondInquirySlice";
import shareOnEmailSlice from "./slices/shareOnEmailSlice";
import compareReducer  from "./slices/compareSlice";
import recentlyViewedReducer  from "./slices/recentlyViewedSlice";

export const store = configureStore({
  reducer: {
    diamondSearchFilter: diamondSearchFilterSlice.reducer,
    diamondSearchApi: diamondSearchApiSlice,
    config: configSlice,
    diamondInquiry: diamondInquirySlice,
    shareOnEmail: shareOnEmailSlice,
    compare: compareReducer ,
    recentlyViewed: recentlyViewedReducer ,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
