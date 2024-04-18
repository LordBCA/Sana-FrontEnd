import React from 'react'
import { ShoppingCartItemList, ShoppingCartSummary } from '../Components/Page/ShoppingCart'

function ShoppingCart() {
  return (      
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-8" style={{ borderRight: '1px solid lightgrey' }}>
        <ShoppingCartItemList />
      </div>
      <div className="col-4">
        <ShoppingCartSummary />
      </div>
    </div>
  )
}

export default ShoppingCart