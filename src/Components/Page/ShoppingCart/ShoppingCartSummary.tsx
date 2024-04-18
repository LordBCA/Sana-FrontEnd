import React, { useState } from 'react'
import { shoppingCartItemModel, shoppingCartModel } from '../../../Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { toastNotify } from '../../../Helper';
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { resetShoppingCart } from '../../../Storage/Redux/shoppingCartSlice';

function ShoppingCartSummary() {
  const dispatch = useDispatch();
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);
  const [createOrder] = useCreateOrderMutation();
  const shoppingCartFromStore = useSelector((state: RootState) => state.shoppingCartStore.shoppingCart);

  // Calculate the total quantity
  const totalQuantity = shoppingCartFromStore?.products.reduce((total, item) => total + item.quantity, 0);

  // Calculate the total price considering quantity
  const totalPrice = shoppingCartFromStore?.products.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreatingOrder(true);
    try {
        const response = await createOrder({
          customerId: shoppingCartFromStore?.customerId,
          products: shoppingCartFromStore?.products.map((item: shoppingCartItemModel, index) => {
            return {
              productId: item.productItemId,
              quantity: item.quantity,
              price: item.price,
              total: (item.quantity * item.price).toFixed(2)
            };}
          )
        });      
        toastNotify("Order created successfully!"); 
        dispatch(resetShoppingCart());
      }catch (error) {        
        toastNotify("Something went wrong", "error");
      }    
    setIsCreatingOrder(false);          
  }

  return (
    <div className="container">
      <h3 className="mt-4 mb-4">Shopping Cart Details</h3>
      <div className="row">
        <div className="col-6 text-left">
          <p>Items ({totalQuantity} units)</p>
        </div>
        <div className="col-6 text-right">
          <p>${totalPrice}</p>
        </div>
      </div>      
      <div className="row">
        <div className="col">
          <hr className="my-4" style={{ borderColor: 'lightgrey' }} />
        </div>
      </div>
      <div className="row">
        <div className="col-6 text-left">
          <p>Total</p>
        </div>
        <div className="col-6 text-right">
          <p>${}</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
        <form onSubmit={handleCreateOrder}>
          <button className="btn btn-primary btn-block" 
            style={{ width: '80%' }}            
            >Process Order &gt;
          </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartSummary