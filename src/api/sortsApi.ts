import { createApi } from "@reduxjs/toolkit/query/react";
import { Category, Group, Sort } from "../lib/types";
import {
  CreateCategoryBody,
  CreateGroupBody,
  CreateSortBody,
  UpdateCategoryBody,
  UpdateGroupBody,
  UpdateSortBody,
} from "./interfaces";
import { CatalogState } from "../redux/reducer/catalogReducer";
import { baseQueryWithReauth } from "./utils";
import { orderBy } from "lodash";

// Define a service using a base URL and expected endpoints
export const sortsApi = createApi({
  reducerPath: "sortsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Sort"],
  endpoints: (builder) => ({
    searchGroupsTotal: builder.query<
      { total: number },
      CatalogState["sortsSearch"]
    >({
      query: (params) => ({ url: `/groups/search/total`, params }),
      providesTags: () => [{ type: "Sort", id: "LIST" }],
    }),

    searchGroups: builder.query<
      Group[],
      { offset: number; limit: number } & CatalogState["sortsSearch"]
    >({
      query: (params) => ({ url: `/groups/search`, params }),
      transformResponse: (response: Group[]) => {
        return orderBy(
          response,
          [(group) => group.name.toLowerCase()],
          ["asc"]
        ).map((group) => ({
          ...group,
          categories: orderBy(
            group.categories,
            [(cat) => cat.name.toLowerCase()],
            ["asc"]
          ).map((cat) => ({
            ...cat,
            sorts: orderBy(
              cat.sorts,
              [(sort) => sort.name.toLowerCase()],
              ["asc"]
            ),
          })),
        }));
      },
      providesTags: () => [{ type: "Sort", id: "LIST" }],
    }),
    getCategories: builder.query<Category[], { groupId: number } | undefined>({
      query: (params) => ({ url: `/categories`, params }),
      providesTags: () => [{ type: "Sort", id: "LIST" }],
    }),
    getGroups: builder.query<Group[], void>({
      query: () => `/groups`,
      providesTags: () => [{ type: "Sort", id: "LIST" }],
    }),

    updateGroup: builder.mutation<Group, UpdateGroupBody>({
      query: (body) => ({
        url: `/groups/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "Sort", id: "LIST" }],
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
      invalidatesTags: () => [{ type: "Sort", id: "LIST" }],
    }),
    deleteGroup: builder.mutation<{ group: number }, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: () => [{ type: "Sort", id: "LIST" }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryBody>({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryBody>({
      query: (body) => ({
        url: `/categories/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    cancelCategory: builder.mutation<{ category: number }, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    deleteCategory: builder.mutation<{ category: number }, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),

    createSort: builder.mutation<Sort, CreateSortBody>({
      query: (body) => ({
        url: `/sorts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    updateSort: builder.mutation<Sort, UpdateSortBody>({
      query: (body) => ({
        url: `/sorts/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    cancelSort: builder.mutation<{ sort: number }, number>({
      query: (id) => ({
        url: `/sorts/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
    deleteSort: builder.mutation<{ sort: number }, number>({
      query: (id) => ({
        url: `/sorts/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: [{ type: "Sort", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchGroupsQuery,
  useSearchGroupsTotalQuery,
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

  useCreateSortMutation,
  useUpdateSortMutation,
  useCancelSortMutation,
  useDeleteSortMutation,
} = sortsApi;
