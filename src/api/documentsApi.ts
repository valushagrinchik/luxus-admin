import { createApi } from "@reduxjs/toolkit/query/react";
import { Document } from "./interfaces";
import { baseQueryWithReauth } from "./utils";

// Define a service using a base URL and expected endpoints
export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadFile: builder.mutation<Document, FormData>({
      query: (formData) => {
        return {
          url: `/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),
    removeFile: builder.mutation<any, number>({
      query: (id) => ({
        url: `/upload/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadFileMutation, useRemoveFileMutation } = documentsApi;
