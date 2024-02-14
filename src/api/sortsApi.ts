import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Category, Group, Sort } from "../lib/types";
import { getToken } from "../lib/token";
import {
  CreateCategoryBody,
  CreateGroupBody,
  CreateSortBody,
  UpdateCategoryBody,
  UpdateGroupBody,
  UpdateSortBody,
} from "./interfaces";
import { CatalogState } from "../redux/reducer/catalogReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${getToken()}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
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
      providesTags: () => [{ type: "Sort", id: "LIST" }],
    }),
    getCategories: builder.query<Category[], { groupId: number } | undefined>({
      query: (params) => ({ url: `/categories`, params }),
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
