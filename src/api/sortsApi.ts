import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Group, Sort } from "../types";
import { getToken } from "../lib/token";
import { CreateCategoryBody, UpdateCategoryBody } from "./interfaces";

// Define a service using a base URL and expected endpoints
export const sortsApi = createApi({
  reducerPath: "sortsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSorts: builder.query<Sort[], void>({
      query: () => `/sorts`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    createCategory: builder.mutation<Category, CreateCategoryBody>({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryBody>({
      query: (body) => ({
        url: `/categories/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    cancelCategory: builder.mutation<{ category: number }, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "POST",
        body: {},
      }),
    }),
    deleteCategory: builder.mutation<{ category: number }, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        body: {},
      }),
    }),

    getGroups: builder.query<Group[], void>({
      query: () => `/groups`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGroupsQuery,

  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useCancelCategoryMutation,
  useDeleteCategoryMutation,

  useGetSortsQuery,
} = sortsApi;
