import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Group, Sort } from "../types";
import { getToken } from "../lib/token";
import {
  CreateCategoryBody,
  SearchParams,
  UpdateCategoryBody,
} from "./interfaces";
import { CatalogState } from "../redux/reducer/catalogReducer";

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
    searchGroups: builder.query<Group[], CatalogState["sortsSearch"]>({
      query: (params) => ({ url: `/groups/search`, params }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    getGroups: builder.query<Group[], void>({
      query: () => `/groups`,
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchGroupsQuery,
  useGetGroupsQuery,
  useGetCategoriesQuery,

  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useCancelCategoryMutation,
  useDeleteCategoryMutation,
} = sortsApi;
