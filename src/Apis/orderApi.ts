import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7150/api/",
    }),
    tagTypes: ["OrderItems"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ customerId, products }) => ({
                url: "orders",
                method: "POST",
                body: {
                    customerId: customerId,
                    orderDetails: products
                  }
            }),            
            invalidatesTags: ["OrderItems"]
        })
    })
});

export const { useCreateOrderMutation } = orderApi;
export default orderApi;