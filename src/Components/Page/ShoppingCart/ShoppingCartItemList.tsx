import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import ShoppingCartItemCard from './ShoppingCartItemCard';
import { shoppingCartItemModel } from '../../../Interfaces';

function ShoppingCartItemList() {
    // Select the shopping cart state from the Redux store
    const shoppingCart = useSelector((state: RootState) => state.shoppingCartStore);

    if (!shoppingCart) {
        return <div>No items in the shopping cart</div>;
    }


    return (
        <div >  
            <div>  
                <h3>My Shopping Cart</h3>
            </div>
            <div className="row">
                <div className="col-1">Product</div>
                <div className="col-5"></div>
                <div className="col-2">Quantity</div>
                <div className="col-2">Price</div>
                <div className="col-2">Total</div>
            </div> 
            <div className="row">
            <div className="col-12">
                <hr className="my-2" style={{ borderColor: 'lightgrey' }} />
            </div>
            </div>  
            {shoppingCart && shoppingCart?.shoppingCart &&
                shoppingCart.shoppingCart.products.map((productItem: shoppingCartItemModel, index: number) =>(
                <ShoppingCartItemCard shoppingCartItem = {productItem} key= {index} />
                ))
            }            
        </div>
    )
}

export default ShoppingCartItemList