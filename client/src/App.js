import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Favorites from "./Pages/Favorites";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import OrderSummary from "./Pages/OrderSummary";
import Orders from "./Pages/Orders";
import PaswordReset from "./Pages/PaswordReset";
import NewPassword from "./Pages/NewPassword";
import UserSettings from "./Pages/UserSettings";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const LoginWrapper = ({ children, currentUser }) => {
    return currentUser ? <Navigate to="/" replace /> : children;
  };
  const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produkty/:category" element={<ProductList />} />
        <Route path="/produkt/:id" element={<Product />} />
        <Route path="/koszyk" element={<Cart />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/zamowienia" element={<Orders />} />
          <Route path="/ustawienia_konta" element={<UserSettings />} />
          <Route path="/ulubione" element={<Favorites />} />
        </Route>
        <Route path="/podsumowanie" element={<OrderSummary />} />
        <Route path="/platnosc_ok" element={<Success />} />
        <Route path="/zapomniane_haslo" element={<PaswordReset />} />
        <Route path="/nowe_haslo" element={<NewPassword />} />

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
