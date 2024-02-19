import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { getToken } from "../lib/token";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${getToken()}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  return result;
};
