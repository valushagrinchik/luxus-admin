import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../lib/types";

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    login: builder.mutation<User, void>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = loginApi;
