import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import { Form, useForm } from "../Components/useForm";
import { register } from "../redux/apiCalls";
import { Button, Title, Input } from "../Reusables/StyledParts";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("images/niemowle-tata.png") center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Agreement = styled.div`
  font-size: 0.8rem;
  margin: 1rem 0;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const { isFetching, error, errorMsg } = useSelector((state) => state.user);
  const inputsInitialState = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    postalCode: "",
    city: "",
    address: "",
    phone: "",
  };
  const formValidatedOk = (inputValues = inputs) => {
    let temp = { ...errors };

    if ("email" in inputValues)
      temp.email = inputValues.email
        ? isEmail(inputValues.email)
          ? ""
          : "Nieprawidłowy adres e-mail."
        : "Pole wymagane.";
    if ("password" in inputValues)
      temp.password =
        inputValues.password.length > 7
          ? ""
          : "Hasło musi mieć conajmniej 8 znaków";
    if ("confirmPassword" in inputValues)
      temp.confirmPassword =
        inputValues.confirmPassword.length > 7
          ? ""
          : "Hasło musi mieć conajmniej 8 znaków";

    if (inputValues == inputs) {
      if (inputValues.password === inputValues.confirmPassword) {
        temp.password = temp.confirmPassword = "";
      } else {
        temp.password = temp.confirmPassword = "Hasła muszą być takie same";
      }
    }
    setErrors({ ...temp });
    if (inputValues == inputs) return Object.values(temp).every((x) => x == "");
  };
  const { inputs, setInputs, errors, setErrors, handleInputChange, resetForm } =
    useForm(inputsInitialState, true, formValidatedOk);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    const user = {
      email: inputs.email,
      password: inputs.password,
      ...(inputs.name && { name: inputs.name }),
      ...(inputs.city && { city: inputs.city }),
      ...(inputs.address && { address: inputs.address }),
      ...(inputs.postalCode && { postalCode: inputs.postalCode }),
      ...(inputs.phone && { phone: inputs.phone }),
    };

    if (formValidatedOk()) {
      register(dispatch, user);
    }
  };
  return (
    <Container>
      <Title>Utwórz konto</Title>
      <Form
        sx={{
          width: {
            sm: "90%",
            lg: "60%",
          },
          backgroundColor: "white",
          borderRadius: "5px",
          gap: 2,
          m: 2,
          p: 2,
          border: "0.5px solid gray",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          justifyContent: "center",
        }}
      >
        <Input
          name="name"
          label="imię i nazwisko"
          value={inputs.name}
          error={errors.name}
          onChange={handleInputChange}
        />
        <Input
          required
          name="email"
          label="e-mail"
          value={inputs.email}
          error={errors.email}
          onChange={handleInputChange}
          // defaultValue="Hello World"
        />

        <Input
          required
          name="password"
          label="hasło"
          type="password"
          value={inputs.password}
          error={errors.password}
          onChange={handleInputChange}
        />
        <Input
          required
          name="confirmPassword"
          label="powtórz hasło"
          type="password"
          value={inputs.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleInputChange}
        />
        <Divider
          textAlign="left"
          sx={{
            gridColumn: {
              md: "span 2",
            },
          }}
        >
          ADRES (do wysyłki)
        </Divider>
        <Input
          name="postalCode"
          label="kod pocztowy"
          value={inputs.postalCode}
          onChange={handleInputChange}
        />
        <Input
          name="city"
          label="miejscowość"
          value={inputs.city}
          onChange={handleInputChange}
        />
        <Input
          name="address"
          label="ulica, nr domu"
          value={inputs.address}
          onChange={handleInputChange}
          // defaultValue="Hello World"
        />
        <Input
          name="phone"
          label="nr telefonu"
          value={inputs.phone}
          onChange={handleInputChange}
          // defaultValue="Hello World"
        />

        <Box
          sx={{
            gridColumn: {
              md: "span 2",
            },
          }}
        >
          <Agreement>
            Utworzenie konta oznacza zgodę na przetwarzanie danych osobowych
            zgodne z <b>Polityką RODO</b>
          </Agreement>
          <Button
            onClick={(e) => handleCreateButtonClick(e)}
            filled
            disabled={isFetching}
            style={{ float: "right" }}
          >
            UTWÓRZ
          </Button>
          <Button
            onClick={() => navigate("/")}
            style={{ float: "right", marginRight: "1rem" }}
          >
            Anuluj
          </Button>
          <Button
            onClick={resetForm}
            style={{ float: "right", marginRight: "1rem" }}
          >
            Wyczyść formularz
          </Button>
        </Box>
        {errorMsg.length > 0 && <Error>{errorMsg}</Error>}
      </Form>
    </Container>
  );
};

export default Register;
