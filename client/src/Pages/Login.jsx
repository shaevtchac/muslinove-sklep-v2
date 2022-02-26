import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import TextField from "@mui/material/TextField";
import { Button } from "../Reusables/StyledParts";
import { useNavigate } from "react-router-dom";

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

const Link = styled.a`
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
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

  const handleLoginButton = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    navigate(-1);
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
            // defaultValue="Hello World"
          />

          <TextField
            required
            id="password"
            label="hasło"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="filled"
            onClick={handleLoginButton}
            disabled={isFetching}
          >
            ZALOGUJ
          </Button>
          {error && <Error>Coś poszło nie tak</Error>}
          <Link>Zapomniałeś/aś hasła?</Link>
          <Link>Utwórz nowe konto</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
