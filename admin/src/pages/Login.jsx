import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, EditInput } from "../components/Reusables";
import { login } from "../redux/apiCalls";
import { reset } from "../redux/userRedux";
import { getToken } from "../requestMethods";

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;
const ErrorMsg = styled.h3`
  color: red;
`;

const Login = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async (e) => {
    // e.preventDefault();
    await login(dispatch, { email, password });
  };
  useEffect(() => {
    if (user.currentUser?.isAdmin) {
      setErrorMsg("");
      window.location.reload(true);
      navigate(-1);
    } else {
      if (user.currentUser !== null) {
        setErrorMsg("Wymagane uprawnienia administratora");
        dispatch(reset());
      }
    }
  }, [user.currentUser, navigate, dispatch]);

  return (
    <Container>
      <h2>Panel administratora – logowanie</h2>
      <ErrorMsg>{errorMsg}</ErrorMsg>
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
      <Button filled disabled={user.isFetching} onClick={handleClick}>
        Logowanie
      </Button>
    </Container>
  );
};

export default Login;
