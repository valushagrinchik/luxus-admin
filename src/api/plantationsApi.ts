import { createApi } from "@reduxjs/toolkit/query/react";
import { Plantation, PlantationFilters } from "../lib/types";
import { CreateGroupBody, UpdateGroupBody } from "./interfaces";
import { baseQueryWithReauth } from "./utils";

// Define a service using a base URL and expected endpoints
export const plantationsApi = createApi({
  reducerPath: "plantationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Plantation"],
  endpoints: (builder) => ({
    searchPlantationsTotal: builder.query<{ total: number }, PlantationFilters>(
      {
        query: (params) => ({ url: `/plantations/search/total`, params }),
        providesTags: () => [{ type: "Plantation", id: "LIST" }],
      }
    ),

    searchPlantations: builder.query<
      Plantation[],
      { offset: number; limit: number } & PlantationFilters
    >({
      query: (params) => ({ url: `/plantations/search`, params }),
      providesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),

    getPlantation: builder.query<Plantation, number>({
      query: (id) => ({ url: `/plantations/${id}` }),
    }),

    updatePlantation: builder.mutation<Plantation, UpdateGroupBody>({
      query: (body) => ({
        url: `/plantations/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),
    createPlantation: builder.mutation<Plantation, CreateGroupBody>({
      query: (body) => ({
        url: `/plantations`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Plantation", id: "LIST" }],
    }),
    cancelPlantation: builder.mutation<{ plantation: number }, number>({
      query: (id) => ({
        url: `/plantations/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),
    deletePlantation: builder.mutation<{ plantation: number }, number>({
      query: (id) => ({
        url: `/plantations/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchPlantationsQuery,
  useSearchPlantationsTotalQuery,
  useGetPlantationQuery,

  useCreatePlantationMutation,
  useUpdatePlantationMutation,
  useCancelPlantationMutation,
  useDeletePlantationMutation,
} = plantationsApi;
