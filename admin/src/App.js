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

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

function App() {
  // const navigate = useNavigate();
  // if (localStorage.getItem("persist:root") === null) navigate("/logowanie");
  // console.log(localStorage.getItem("persist:root"));
  const storage = localStorage.getItem("persist:root");
  const admin = storage
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
        .currentUser?.isAdmin
    : null;

  const PrivateRoute = () => {
    const auth = admin; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/logowanie" />;
  };
  const LoginWrapper = ({ children, user }) => {
    return user ? <Navigate to="/" replace /> : children;
  };
  return (
    <Router>
      {admin && <Topbar />}
      <Container>
        {admin && <Sidebar />}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/uzytkownicy" element={<UserList />} />
            <Route path="/uzytkownik/:userId" element={<User />} />
            <Route path="/nowy_uzytkownik" element={<NewUser />} />
            <Route path="/produkty" element={<ProductList />} />
            <Route path="/produkt/:productId" element={<Product />} />
            <Route path="/nowy_produkt" element={<NewProduct />} />
          </Route>
          <Route
            path="/logowanie"
            element={
              // <LoginWrapper currentUser={admin}>
              <Login />
              // </LoginWrapper>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
