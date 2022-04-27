import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import TextField from "@mui/material/TextField";
import { Button } from "../Reusables/StyledParts";
import { useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct as addProductToCart } from "../redux/cartRedux";
import { addProduct as addProductToFavorites } from "../redux/favoritesRedux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("images/niemowle-mama.png") center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SLink = styled(Link)`
  font-size: 0.8rem;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLoginButton = async (e) => {
    try {
      const user = await login(dispatch, { email, password });
      //load cart
      try {
        const res = await publicRequest.get(`carts/find/${user._id}`, {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        const cartProducts = res.data.products;
        if (cartProducts.length > 0) {
          cartProducts.forEach((item) =>
            dispatch(
              addProductToCart({ ...item.product, quantity: item.quantity })
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const res = await publicRequest.get(`favorites/find/${user._id}`, {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        const favProducts = res.data.products;
        if (favProducts.length > 0) {
          favProducts.forEach((item) =>
            dispatch(
              addProductToFavorites({
                ...item.product,
              })
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    } catch (loginError) {
      console.error(loginError);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Zaloguj się</Title>
        <Form>
          <TextField
            required
            id="email"
            label="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            id="password"
            label="hasło"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button filled onClick={handleLoginButton} disabled={isFetching}>
            ZALOGUJ
          </Button>
          {error && <Error>Coś poszło nie tak</Error>}
          <SLink to={"/zapomniane_haslo"}>Zapomniałeś/aś hasła?</SLink>
          <SLink to={"/rejestracja"}>Utwórz nowe konto</SLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
