import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Form, useForm } from "../Hooks/useForm";
import { validateToken } from "../redux/apiCalls";
import { fetchingStart } from "../redux/userRedux";
import { publicRequest } from "../requestMethods";
import { Button, Card, Input, Title } from "../Reusables/StyledParts";

const STitle = styled(Title)`
  text-align: center;
  margin-block: 1rem;
`;

const SCard = styled(Card)`
  max-width: 350px;
  margin: 0 auto;
`;
const inputsInitialState = {
  password: "",
  confirmPassword: "",
};
const Message = styled.p`
  text-align: center;
  margin-block: 5rem;
`;

const TokenExpiredMsg = () => {
  return (
    <>
      <p>Wystąpił problem z linkiem zmiany hasła. Najprawdopodobniej wygasł.</p>
      <br />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Link to={"/"}>
          <Button>Strona główna</Button>
        </Link>
        <Link to={"/zapomniane_haslo"}>
          <Button filled>Zmień hasło ponownie</Button>
        </Link>
      </div>
    </>
  );
};
const PasswordChangedMsg = () => {
  return (
    <Message>
      Hasło zostało zmienione. <br />
      <br />
      <Link to={"/"}>
        <Button filled>OK</Button>
      </Link>
    </Message>
  );
};

const NewPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const formValidatedOk = (inputValues = inputs) => {
    let temp = { ...errors };
    if ("password" in inputValues) {
      temp.password =
        inputValues.password.length > 7
          ? ""
          : "Hasło musi mieć conajmniej 8 znaków";
    }

    if ("confirmPassword" in inputValues)
      temp.confirmPassword =
        inputValues.confirmPassword.length > 7
          ? ""
          : "Hasło musi mieć conajmniej 8 znaków";
    if (inputValues == inputs) {
      if (inputs.password !== inputs.confirmPassword) {
        temp.password = temp.confirmPassword = "Hasła muszą być takie same";
      }
    }
    setErrors({ ...temp });
    // return true if form ok
    if (inputValues == inputs)
      return Object.values(temp).every((x) => x === "");
  };

  const { inputs, setInputs, errors, setErrors, handleInputChange, resetForm } =
    useForm(inputsInitialState, true, formValidatedOk);
  const dispatch = useDispatch();
  const { isFetching, error, errorMsg } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!formValidatedOk()) return;
    try {
      const res = await publicRequest.put(
        `/users/${user._id}`,
        {
          password: inputs.password,
        },
        { headers: { token: `Bearer ${user.accessToken}` } }
      );
      setPasswordChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchingStart());
    validateToken(dispatch, token, userId);
  }, [token, userId, dispatch]);

  return (
    <>
      <Navbar />
      <STitle>Odzyskiwanie hasła</STitle>
      <SCard>
        {isFetching && <Message>Wczytywanie...</Message>}
        {!error && !passwordChanged && (
          <Form
            onSubmit={handleChangePassword}
            sx={{ display: "grid", gap: "1rem", margin: "1rem" }}
          >
            <span>Wpisz nowe hasło do konta i naciśnij OK</span>
            <Input
              name="password"
              value={inputs.password}
              label="hasło"
              onChange={handleInputChange}
              error={errors.password}
              required
              type="password"
            />
            <Input
              name="confirmPassword"
              value={inputs.confirmPassword}
              label="potwierdź hasło"
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
              type="password"
            />
            <Button type="submit" filled>
              OK
            </Button>
          </Form>
        )}
        {passwordChanged && <PasswordChangedMsg />}
        {error && (
          <Message>
            {errorMsg === "Token not found." ? <TokenExpiredMsg /> : errorMsg}
          </Message>
        )}
      </SCard>
    </>
  );
};

export default NewPassword;
