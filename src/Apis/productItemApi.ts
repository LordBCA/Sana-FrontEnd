import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productItemApi = createApi({
    reducerPath: "productItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7150/api/",
    }),
    tagTypes: ["ProductItems"],
    endpoints: (builder) => ({
        getProductItems: builder.query({
            query: ({ pageNumber, pageSize, sortDirection }) => ({
                url: "products",
                params: {
                    ...(sortDirection && { sortDirection }),
                    ...(pageSize && { pageSize }),
                    ...(pageNumber && { pageNumber }),
                  }
            }),
            providesTags: ["ProductItems"]
        })
    })
});

export const { useGetProductItemsQuery } = productItemApi;
export default productItemApi;