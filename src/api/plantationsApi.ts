import { createApi } from "@reduxjs/toolkit/query/react";
import { Plantation, PlantationThin, PlantationFilters } from "../lib/types";
import { CreatePlantationBody, UpdatePlantationBody } from "./interfaces";
import { baseQueryWithReauth } from "./utils";
import { transformPlantationDataBack } from "../lib/utils";
import { EditPlantationInput } from "../components/forms/EditPlantationForm/interfaces";
import { CatalogState } from "../redux/reducer/catalogReducer";

// Define a service using a base URL and expected endpoints
export const plantationsApi = createApi({
  reducerPath: "plantationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Plantation"],
  endpoints: (builder) => ({
    searchPlantationsTotal: builder.query<
      { total: number },
      PlantationFilters & { search?: CatalogState["plantationsSearch"] }
    >({
      query: (params) => ({
        url: `/plantations/search/total`,
        params: {
          ...params,
          ...params.search,
        },
      }),
      providesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),

    searchPlantations: builder.query<
      PlantationThin[],
      { offset: number; limit: number } & PlantationFilters & {
          search?: CatalogState["plantationsSearch"];
        }
    >({
      query: (params) => ({
        url: `/plantations/search`,
        params: {
          ...params,
          ...params.search,
        },
      }),
      providesTags: () => [{ type: "Plantation", id: "LIST" }],
    }),

    getPlantation: builder.query<EditPlantationInput, number>({
      query: (id) => ({ url: `/plantations/${id}` }),
      transformResponse: (response: Plantation) => {
        return transformPlantationDataBack(response);
      },
      providesTags: (result) => {
        return [{ type: "Plantation", id: result?.generalInfo.id }];
      },
    }),

    updatePlantation: builder.mutation<
      { plantation: number },
      UpdatePlantationBody
    >({
      query: (body) => {
        return {
          url: `/plantations/${body.id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result) => [
        { type: "Plantation", id: "LIST" },
        { type: "Plantation", id: result?.plantation },
      ],
    }),
    createPlantation: builder.mutation<
      { plantation: number },
      CreatePlantationBody
    >({
      query: (body) => ({
        url: `/plantations`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "Plantation", id: "LIST" },
        { type: "Plantation", id: result?.plantation },
      ],
    }),
    cancelPlantation: builder.mutation<{ plantation: number }, number>({
      query: (id) => ({
        url: `/plantations/${id}/cancel`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: (result) => [
        { type: "Plantation", id: "LIST" },
        { type: "Plantation", id: result?.plantation },
      ],
    }),
    deletePlantation: builder.mutation<{ plantation: number }, number>({
      query: (id) => ({
        url: `/plantations/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: (result) => [
        { type: "Plantation", id: "LIST" },
        { type: "Plantation", id: result?.plantation },
      ],
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
