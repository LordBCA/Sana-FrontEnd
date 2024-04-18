import { shoppingCartItemModel } from "./shoppingCartItemModel";

export interface shoppingCartModel {
    customerId: number;
    products: shoppingCartItemModel[];
  }