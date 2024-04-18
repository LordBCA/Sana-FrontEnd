import { configureStore, createSlice } from "@reduxjs/toolkit";
import { productItemReducer } from "./productItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { productItemApi, orderApi } from "../../Apis";

const store = configureStore({
    reducer: {
        productItemStore: productItemReducer,
        shoppingCartStore: shoppingCartReducer,
        [productItemApi.reducerPath]: productItemApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(productItemApi.middleware)
            .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
