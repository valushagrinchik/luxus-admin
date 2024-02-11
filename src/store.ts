import { configureStore } from "@reduxjs/toolkit";
import { sortsApi } from "./api/sortsApi";
import { loginApi } from "./api/loginApi";

export const store = configureStore({
  reducer: {
    [sortsApi.reducerPath]: sortsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sortsApi.middleware)
      .concat(loginApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
