import { createSlice } from "@reduxjs/toolkit";
import { productItemModel } from "../../Interfaces";

interface ProductItemState {
    productItem: productItemModel[] | null;
  }
  

const initialState: ProductItemState = {
    productItem: null,
}

export const productItemSlice = createSlice({
    name: "ProductItem",
    initialState: initialState,
    reducers: {
        setProductItem: (state, action) => {
            state.productItem = action.payload;
        }
    }
})

export const { setProductItem } = productItemSlice.actions;
export const productItemReducer = productItemSlice.reducer;