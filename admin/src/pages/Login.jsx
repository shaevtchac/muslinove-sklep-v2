import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, EditInput } from "../components/Reusables";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    navigate("/", { replace: true });
  };
  return (
    <Container>
      <h2>Panel administratora – logowanie</h2>
      <EditInput
        type="text"
        placeholder="nazwa użytkownika"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <EditInput
        type="password"
        name="password"
        placeholder="hasło"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClick}>Logowanie</Button>
    </Container>
  );
};

export default Login;
