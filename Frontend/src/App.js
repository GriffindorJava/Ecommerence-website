import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Main from "./pages/Main";
import Basket from "./pages/Basket";
import Product from "./pages/Product";
import Register from "./pages/Register";
import OrderPage from "./pages/OrderPage";
import OrdersPage from "./pages/OrdersPage";
import Account from "./pages/Account";
import Menubar from "./components/Menubar";
import ProtectedRoute from "./ProtectedRoute"

const App = () => {
  useEffect(() => {
    document.title = "DrunkCat"
 }, []);

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/search" element={<Main/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/product/:pid" element={<Product/>}/>
            <Route path="/order" element={<ProtectedRoute path="/order" component={OrderPage} />}/>
            <Route path="/orders" element={<ProtectedRoute path="/orders" component={OrdersPage} />}/>
            <Route path="/account" element={<ProtectedRoute path="/account" component={Account} />}/>
            <Route path="/*" element={
            <div>
              <h1>404</h1>
              <h3>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h3>
            </div>}/>
        </Routes>
    </Router>
  );
}

export default App;
