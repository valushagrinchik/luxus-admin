import { createApi } from "@reduxjs/toolkit/query/react";
import { Plantation, PlantationFilters } from "../lib/types";
import { CreatePlantationBody, UpdatePlantationBody } from "./interfaces";
import { baseQueryWithReauth } from "./utils";
import { transformPlantationDataBack } from "../lib/utils";
import { EditPlantationInput } from "../components/forms/EditPlantationForm/interfaces";

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

    getPlantation: builder.query<EditPlantationInput, number>({
      query: (id) => ({ url: `/plantations/${id}` }),
      transformResponse: (response: Plantation) => {
        return transformPlantationDataBack(response);
      },
    }),

    updatePlantation: builder.mutation<Plantation, UpdatePlantationBody>({
      query: (body) => ({
        url: `/plantations/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),
    createPlantation: builder.mutation<Plantation, CreatePlantationBody>({
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
