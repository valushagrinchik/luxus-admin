import { configureStore } from "@reduxjs/toolkit";
import { sortsApi } from "./api/sortsApi";

export const store = configureStore({
  reducer: {
    [sortsApi.reducerPath]: sortsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sortsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
