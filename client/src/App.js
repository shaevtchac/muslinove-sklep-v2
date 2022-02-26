import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import OrderSummary from "./Pages/OrderSummary";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const LoginWrapper = ({ children, currentUser }) => {
    return currentUser ? <Navigate to="/" replace /> : children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produkty/:category" element={<ProductList />} />
        <Route path="/produkt/:id" element={<Product />} />
        <Route path="/koszyk" element={<Cart />} />
        <Route path="/podsumowanie" element={<OrderSummary />} />
        <Route
          path="/logowanie"
          element={
            <LoginWrapper currentUser={user}>
              <Login />
            </LoginWrapper>
          }
        />
        <Route
          path="/rejestracja"
          element={
            <LoginWrapper currentUser={user}>
              <Register />
            </LoginWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
