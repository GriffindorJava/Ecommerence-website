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

function App() {
  return (
    <Router>
      <Menubar/>
      <div>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/product/:productId" element={<Product/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/*" element={
            <div>
              <h1>404</h1>
              <h3>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h3>
            </div>}/>
        </Routes>
        </div>
    </Router>
  );
}

export default App;
