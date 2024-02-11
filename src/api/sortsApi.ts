import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Group } from "../types";

// Define a service using a base URL and expected endpoints
export const sortsApi = createApi({
  reducerPath: "sortsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getGroups: builder.query<Group, void>({
      query: () => `/groups`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGroupsQuery } = sortsApi;
