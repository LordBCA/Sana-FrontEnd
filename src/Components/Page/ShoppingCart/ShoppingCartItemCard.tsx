import React, { useEffect, useState } from 'react'
import { shoppingCartItemModel, updateProductQuantityPayload } from '../../../Interfaces';
import { updateProductQuantiy, deleteProduct } from '../../../Storage/Redux/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toastNotify } from '../../../Helper';

interface Props {
    shoppingCartItem: shoppingCartItemModel;
}

function ShoppingCartItemCard(props : Props) {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(props.shoppingCartItem.quantity);

    const handleQuantity = (counter: number) => {        
        let newQuantity = quantity + counter;
        if (newQuantity == 0) {
            newQuantity = 1;
        }

        if (newQuantity > props.shoppingCartItem.stock) {
            toastNotify("It is not possible to add a quantity greater than the available stock.", "warning");
            return;
        }
        setQuantity(newQuantity);
        
        const productToAddOrUpdate: updateProductQuantityPayload = {
          productItemId: props.shoppingCartItem.productItemId,
          quantity: newQuantity            
        };
        // Dispatch action to add or update product
        dispatch(updateProductQuantiy(productToAddOrUpdate));         
    };    

    const handleDelete = (productItemId: number) => {
        // Dispatch action to delete product
        dispatch(deleteProduct(productItemId));
        toastNotify("Product removed from cart successfully!.", "info");          
        return;
    }

  return (
    <div>
    <div className="row">
    <div className="col-1">
      <img src={props.shoppingCartItem.image}
        alt="Product" style={{ width: '50px', height: '50px' }} />
    </div>
    <div className="col-5">
      <div>
        <h5>{props.shoppingCartItem.title}</h5>
        <p>Item No. {props.shoppingCartItem.code}</p>
        <i className="bi bi-trash3-fill" style={{cursor: "pointer"}}
                    onClick={() => handleDelete(props.shoppingCartItem.productItemId)}>
                        Delete
                </i>
      </div>
    </div>
    <div className="col-2">
      <div className="input-group">
      <span
                    className="pb-2  p-1"
                    style={{ border: "1px solid #333", borderRadius: "10px", width: "120px"}}
                    >
                        <i onClick={() => { handleQuantity(-1); }}
                            className="bi bi-dash p-1"
                            style={{ fontSize: "20px", cursor: "pointer" }}
                        ></i>
                        <span className="mt-3 px-3">{props.shoppingCartItem.quantity}</span>
                        <i
                            className="bi bi-plus p-1"
                            onClick={() => { handleQuantity(+1); }}
                            style={{ fontSize: "20px", cursor: "pointer" }}
                        ></i>
                    </span>
      </div>
    </div>
    <div className="col-2">${props.shoppingCartItem.price}</div>
    <div className="col-2">${props.shoppingCartItem.price  * props.shoppingCartItem.quantity}</div>
  </div>
  <div className="row">
  <div className="col-12">
    <hr className="my-2" style={{ borderColor: 'lightgrey' }} />
  </div>
</div>  
</div>      
  )
}

export default ShoppingCartItemCard