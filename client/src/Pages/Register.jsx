import styled from "@emotion/styled";
import { Title, Button } from "../Reusables/StyledParts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";
import isEmail from "validator/es/lib/isEmail";

const Container = styled.div`
  width: 100wv;
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateButtonClick = (e) => {
    let user = {};
    e.preventDefault();
    if (name !== "") user.name = name;
    if (isEmail(email)) {
      user.email = email;
    } else {
      setEmailHelperText("Wpisz prawidłowy adres e-mail");
      setEmailError(true);
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordHelperText("Wpisane hasła muszą być jednakowe.");
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("Hasło musi mieć conajmniej 8 znaków");
    } else user.password = password;
    if (postalCode !== "") user.postalCode = postalCode;
    if (city !== "") user.city = city;
    if (address !== "") user.address = address;
    if (phone !== "") user.phone = phone;

    if (emailError || passwordError) {
      return;
    } else {
      register(dispatch, user);
      navigate("/logowanie");
    }
  };
  return (
    <Container>
      <Title>Utwórz konto</Title>
      <Box
        component="form"
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
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="imię i nazwisko"
          // defaultValue="Hello World"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="email"
          label="e-mail"
          error={emailError}
          helperText={emailHelperText}
          onChange={(e) => setEmail(e.target.value)}
          // defaultValue="Hello World"
        />

        <TextField
          required
          id="password"
          label="hasło"
          type="password"
          error={passwordError}
          helperText={passwordHelperText}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <TextField
          required
          id="confirm-password"
          label="powtórz hasło"
          type="password"
          error={passwordError}
          helperText={passwordHelperText}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="current-password"
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
        <TextField
          id="postal-code"
          label="kod pocztowy"
          onChange={(e) => setPostalCode(e.target.value)}
          // defaultValue="Hello World"
        />
        <TextField
          id="city"
          label="miejscowość"
          onChange={(e) => setCity(e.target.value)}
          // defaultValue="Hello World"
        />
        <TextField
          id="address"
          label="ulica, nr domu"
          onChange={(e) => setAddress(e.target.value)}
          // defaultValue="Hello World"
        />
        <TextField
          id="phone"
          label="nr telefonu"
          onChange={(e) => setPhone(e.target.value)}
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
            type="filled"
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
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
