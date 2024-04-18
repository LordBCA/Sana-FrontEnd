import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shoppingCartModel, shoppingCartItemModel, updateProductQuantityPayload } from '../../Interfaces';

interface ShoppingCartState {
  shoppingCart: shoppingCartModel | null;
}

const initialState: ShoppingCartState = {
  shoppingCart: null,
};

const shoppingCartSlice = createSlice({
  name: 'ShoppingCart',
  initialState,
  reducers: {
    addOrUpdateProduct: (state, action: PayloadAction<shoppingCartItemModel>) => {
      const { productItemId, quantity, price, title, code, stock, image } = action.payload;
      
      if (!state.shoppingCart) {
        state.shoppingCart = {
          customerId: 1, // Sample customerId
          products: [{
            productItemId,
            quantity,
            price,
            title,
            code, 
            stock,
            image
          }],
        };
      } else {
        const existingProductIndex = state.shoppingCart.products.findIndex(product => product.productItemId === productItemId);
        if (existingProductIndex !== -1) {
            // If product exists, create a new array with updated product
          state.shoppingCart.products = state.shoppingCart.products.map(product => {
            if (product.productItemId === productItemId) {
              return {
                ...product,
                quantity: product.quantity + quantity,
                price: price,
              };
            }
            return product;
          });          
        } else {
          state.shoppingCart.products.push({
            productItemId,
            quantity,
            price,
            title,
            code, 
            stock,
            image
          });
        }
      }
    },
    updateProductQuantiy: (state, action: PayloadAction<updateProductQuantityPayload>) => {
      const { productItemId, quantity } = action.payload;
      if (state.shoppingCart) {
        state.shoppingCart.products = state.shoppingCart.products.map(product => {
          if (product.productItemId === productItemId) {
            return {
              ...product,
              quantity: quantity,
            };
          }
          return product;
      });   
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      if (state.shoppingCart) {
        state.shoppingCart.products = state.shoppingCart.products.filter(product => product.productItemId !== action.payload);
      }
    },
    resetShoppingCart: (state) => {
      state.shoppingCart = null; // Reset shopping cart to null
    },
  },
});

export const { addOrUpdateProduct, deleteProduct, updateProductQuantiy, resetShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;