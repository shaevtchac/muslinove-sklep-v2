import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser.jsx";
import ProductList from "./pages/ProductList";
import NewProduct from "./pages/NewProduct";
import Product from "./pages/Product";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import TransactionList from "./pages/TransactionList";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

function App() {
  // const navigate = useNavigate();
  // if (localStorage.getItem("persist:root") === null) navigate("/logowanie");
  // console.log(localStorage.getItem("persist:root"));
  const user = useSelector((state) => state.user.currentUser);
  const auth = user && user.isAdmin;
  // const storage = localStorage.getItem("persist:root");
  // const admin = storage
  //   ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
  //       .currentUser?.isAdmin
  //   : null;

  const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/logowanie" />;
  };

  return (
    <Router basename="/admin">
      {auth && <Topbar />}
      <Container>
        {auth && <Sidebar />}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/uzytkownicy" element={<UserList />} />
            <Route path="/transakcje" element={<TransactionList />} />
            <Route path="/uzytkownik/:userId" element={<User />} />
            <Route path="/nowy_uzytkownik" element={<NewUser />} />
            <Route path="/produkty" element={<ProductList />} />
            <Route path="/edytuj_produkt/:productId" element={<Product />} />
            <Route path="/nowy_produkt" element={<NewProduct />} />
          </Route>
          <Route path="/logowanie" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
