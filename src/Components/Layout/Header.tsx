// import React from 'react'

import { NavLink } from "react-router-dom";

let logo = require("../../Assets/Images/logo.png");

function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">        
        <img src={logo} style={{height: "30px"}} className="m-1"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            Catalog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/shoppingCart">
            Shopping Cart
          </NavLink>          
        </li>        
      </ul>      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header