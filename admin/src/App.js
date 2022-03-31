import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";
import NewUser from "./pages/NewUser";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import TransactionDetails from "./pages/TransactionDetails";
import TransactionList from "./pages/TransactionList";
import User from "./pages/User";
import UserList from "./pages/UserList";

export const drawerWidth = 240;
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const auth = user && user.isAdmin;

  const PrivateRoute = () => {
    // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/logowanie" />;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        username={user ? user.name : null}
      />

      <Drawer open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

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
            <Route
              path="/transakcja/:transactionId"
              element={<TransactionDetails />}
            />
          </Route>
          <Route path="/logowanie" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
}
