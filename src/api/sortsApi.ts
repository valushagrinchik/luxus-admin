import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Group, Sort } from "../types";
import { getToken } from "../lib/token";
import {
  CreateCategoryBody,
  CreateGroupBody,
  UpdateCategoryBody,
  UpdateGroupBody,
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
  tagTypes: ["Sort"],
  endpoints: (builder) => ({
    searchGroups: builder.query<Group[], CatalogState["sortsSearch"]>({
      query: (params) => ({ url: `/groups/search`, params }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Sort" as const, id })),
              { type: "Sort", id: "LIST" },
            ]
          : [{ type: "Sort", id: "LIST" }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    getGroups: builder.query<Group[], void>({
      query: () => `/groups`,
    }),

    updateGroup: builder.mutation<Group, UpdateGroupBody>({
      query: (body) => ({
        url: `/groups/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Sort", id }],
    }),
    createGroup: builder.mutation<Group, CreateGroupBody>({
      query: (body) => ({
        url: `/groups`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    cancelGroup: builder.mutation<{ group: number }, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "POST",
        body: {},
      }),
    }),
    deleteGroup: builder.mutation<{ group: number }, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
        body: {},
      }),
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

  useCreateGroupMutation,
  useUpdateGroupMutation,
  useCancelGroupMutation,
  useDeleteGroupMutation,

  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useCancelCategoryMutation,
  useDeleteCategoryMutation,
} = sortsApi;
