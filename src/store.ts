import { configureStore } from "@reduxjs/toolkit";
import { plantationsApi } from "./api/plantationsApi";

import { sortsApi } from "./api/sortsApi";
import { loginApi } from "./api/loginApi";
import catalogReducer from "./redux/reducer/catalogReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { documentsApi } from "./api/documentsApi";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    [plantationsApi.reducerPath]: plantationsApi.reducer,
    [sortsApi.reducerPath]: sortsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(plantationsApi.middleware)
      .concat(sortsApi.middleware)
      .concat(loginApi.middleware)
      .concat(documentsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
