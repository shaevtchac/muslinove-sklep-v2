import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { Button, Card, Input, Title } from "../Reusables/StyledParts";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useDispatch, useSelector } from "react-redux";
import * as templateColors from "../Reusables/Constants/Colors";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useForm, Form } from "../Components/useForm";
import { register } from "../redux/apiCalls";

const name = localStorage.name;
const postalCode = localStorage.postalCode;
const email = localStorage.email;
const city = localStorage.city;
const phone = localStorage.phone;
const address = localStorage.address;
const orderId = localStorage.orderId;
const orderToken = localStorage.orderToken;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;
const CenteredText = styled.p`
  text-align: center;
  margin-block: 1rem;
`;

const inputsInitialState = {
  password: "",
  confirmPassword: "",
};

const Success = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [formVisible, setFormVisible] = useState(false);

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
  const handleRegisterUser = (e) => {
    e.preventDefault();
    if (!formValidatedOk()) return;
    //register user
    const user = {
      email,
      password: inputs.password,
      name,
      city,
      address,
      postalCode,
      ...(phone && { phone: inputs.phone }),
    };
    // register(dispatch, user);
    register(dispatch, user, orderId);
  };

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" maxWidth="400px" margin="0 auto">
        <Grid item>
          <CreditScoreIcon
            sx={{
              fontSize: "100px",
              color: templateColors.BODY_COLOR_DARK,
            }}
          />
        </Grid>
        <Grid item>
          <Title style={{ textAlign: "center", margin: "1rem" }}>
            Dziękujemy za płatność
          </Title>
        </Grid>
        <Grid item>
          <Card style={{ marginBottom: "2rem" }}>
            <p>
              Na adres <b>{email}</b> zostanie wysłana wiadomość ze szczegółami
              transakcji.
            </p>
            <p>
              Twoje zamówienie jest w trakcie przygotowania i zostanie wysłane
              na adres:
            </p>
            <CenteredText>
              <b>{name}</b>
              <br />
              {address}
              <br />
              {postalCode + " " + city}
              <br />
              <br />
              Identyfikator zamówienia to: <b>{orderId} </b>
            </CenteredText>
            <ButtonContainer>
              <Link to="/">
                <Button>Strona główna</Button>
              </Link>{" "}
              <Link to="/zamowienia">
                <Button disabled={!user} filled>
                  Moje zamówienia
                </Button>
              </Link>
            </ButtonContainer>
            {!user && (
              <>
                <CenteredText>
                  Wprowadzone dane zostaną utracone po opuszczeniu strony.
                  Możesz je zachować na potrzeby przyszłych zamówień i utworzyć
                  konto na ich podstawie.
                </CenteredText>
                <Button
                  filled
                  style={{ width: "100%" }}
                  onClick={() => setFormVisible((prev) => !prev)}
                >
                  UTWÓRZ KONTO
                </Button>
              </>
            )}
            {formVisible && (
              <>
                <CenteredText>
                  <b>login:</b> {localStorage.email}
                </CenteredText>
                <Form
                  onSubmit={handleRegisterUser}
                  sx={{ display: "grid", gap: "1rem", margin: "1rem" }}
                >
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
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Success;
