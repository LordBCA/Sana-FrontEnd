
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header, Footer } from '../Components/Layout';
import { Catalog, NotFound, ShoppingCart } from "../Pages";
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Header/>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Catalog />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>      
      <Footer/>
    </div>
  );
}

export default App;
