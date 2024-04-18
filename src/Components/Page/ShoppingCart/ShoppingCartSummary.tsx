import React, { useState } from 'react'
import { shoppingCartItemModel, shoppingCartModel } from '../../../Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { toastNotify } from '../../../Helper';
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { resetShoppingCart } from '../../../Storage/Redux/shoppingCartSlice';
import { MiniLoader } from '../Common';

function ShoppingCartSummary() {
  const dispatch = useDispatch();
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);
  const [createOrder] = useCreateOrderMutation();
  const shoppingCartFromStore = useSelector((state: RootState) => state.shoppingCartStore.shoppingCart);

  // Calculate the totals
  let totalItems = 0;
  let totalPrice = 0;
  let totalOrder = 0;

  shoppingCartFromStore?.products.map((cartItem: shoppingCartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    totalPrice += ((cartItem?.price ?? 0) * (cartItem.quantity ?? 0));
    totalOrder += ((cartItem?.price ?? 0) * (cartItem.quantity ?? 0));
    return null;
  });

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
          <p>Items ({totalItems} units)</p>
        </div>
        <div className="col-6 text-right">
          <p>${totalPrice.toFixed(2)}</p>
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
          <p>${totalOrder.toFixed(2)}</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
        <form onSubmit={handleCreateOrder}>
          {isCreatingOrder ? (
            <button disabled className="btn btn-primary btn-block" 
              style={{ width: '80%' }}            
              >
                <MiniLoader />
            </button>
            ) : (
            <button disabled={!(totalPrice > 0)} className="btn btn-primary btn-block" 
              style={{ width: '80%' }}            
              >Process Order &gt;
            </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartSummary