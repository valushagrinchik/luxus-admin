import {
  Middleware,
  MiddlewareAPI,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { sortsApi } from "./api/sortsApi";
import { loginApi } from "./api/loginApi";
import catalogReducer from "./redux/reducer/catalogReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";

// const unauthMiddleware: Middleware =
//   (api: MiddlewareAPI) => (next) => (action) => {
//     console.log(api, "api");
//     // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
//     if (isRejectedWithValue(action)) {
//       if ((action.payload as { status: number }).status === 401) {
//         console.log(action, "action");
//         redirect("/login");
//         return;
//       }
//     }

//     return next(action);
//   };

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    [sortsApi.reducerPath]: sortsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(unauthMiddleware)
      .concat(sortsApi.middleware)
      .concat(loginApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
