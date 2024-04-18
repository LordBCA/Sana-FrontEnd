import React, { useState } from 'react'
import { shoppingCartItemModel, productItemModel } from '../../../Interfaces'
import { addOrUpdateProduct } from '../../../Storage/Redux/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MiniLoader } from '../Common';
import { RootState } from '../../../Storage/Redux/store';
import { toastNotify } from '../../../Helper';

interface Props {
    productItem: productItemModel;
}

function ProductItemCard(props: Props) {
  
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Select the current quantity from the Redux store
    const currentQuantity = useSelector((state: RootState) => {
      const product = state.shoppingCartStore.shoppingCart?.products.find(product => product.productItemId === props.productItem.id);
      return product ? product.quantity : 0;
    });

    const handleQuantity = (counter: number) => {
        let newQuantity = quantity + counter;
        if (newQuantity == 0) {
            newQuantity = 1;
        }
        setQuantity(newQuantity);
        return;
    };

    const handleAddToCart = async (productItemId: number) => {

      setIsAddingToCart(true);

      if ((quantity + currentQuantity) > props.productItem.stock){
        toastNotify("It is not possible to add a quantity greater than the available stock.", "warning");
        setIsAddingToCart(false);
        return;
      }

      const productToAddOrUpdate: shoppingCartItemModel = {
        productItemId: productItemId,
        quantity: quantity,
        price: props.productItem.price,
        title: props.productItem.title,
        code: props.productItem.code,
        stock: props.productItem.stock,
        image: props.productItem.image
      };
      // Dispatch action to add or update a row
      dispatch(addOrUpdateProduct(productToAddOrUpdate));

      setIsAddingToCart(false);
      toastNotify("Product added to cart successfully!");      
    };
    
  return (
    <div>
        <div className="row">
      <div className="col-md-12 ">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={props.productItem.image}
                    style={{ width: '90px', height: '90px' }} />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{backgroundColor: `rgba(253, 253, 253, 0.15)`}}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>{props.productItem.title}</h5>
                <div className="d-flex flex-row">
                  <div className="text-danger mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <div className="mt-1 mb-0 text-muted small">
                  <span>Item No. {props.productItem.code} | <span style={{color:"#59BF18", fontWeight: "bolder"}}>{props.productItem.stock} in stock</span> </span>                  
                </div>                
                <p className="text-truncate mb-4 mb-md-0">
                  {props.productItem.description}
                </p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">${props.productItem.price}</h4>                  
                </div>                
                <div className="d-flex flex-column mt-4">                  
                  <span
                    className="pb-2  p-1"
                    style={{ border: "1px solid #333", borderRadius: "10px", width: "120px"}}
                    >
                        <i onClick={() => { handleQuantity(-1); }}
                            className="bi bi-dash p-1"
                            style={{ fontSize: "20px", cursor: "pointer" }}
                        ></i>
                        <span className="mt-3 px-3">{quantity}</span>
                        <i
                            className="bi bi-plus p-1"
                            onClick={() => { handleQuantity(+1); }}
                            style={{ fontSize: "20px", cursor: "pointer" }}
                        ></i>
                    </span>
                    {isAddingToCart ? (                     
                      <button disabled className="btn btn-primary btn-sm mt-2">
                        <MiniLoader />
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm mt-2"
                        onClick={() => handleAddToCart(props.productItem.id)}>
                          Add to cart
                      </button>
                    )}                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>        
    </div>
  )
}

export default ProductItemCard