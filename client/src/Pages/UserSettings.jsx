import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Form, useForm } from "../Hooks/useForm";
import {
  fetchingEnd,
  fetchingFailure,
  fetchingStart,
} from "../redux/userRedux";
import { publicRequest } from "../requestMethods";
import { Button, Title, Input } from "../Reusables/StyledParts";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.span`
  color: red;
`;

const UserSettings = () => {
  const { isFetching, error, errorMsg } = useSelector((state) => state.user);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
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
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const formValidatedOk = (inputValues = inputs) => {
    let temp = { ...errors };

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

  const handleCreateButtonClick = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...(inputs.password && { password: inputs.password }),
      ...(inputs.name && { name: inputs.name }),
      ...(inputs.city && { city: inputs.city }),
      ...(inputs.address && { address: inputs.address }),
      ...(inputs.postalCode && { postalCode: inputs.postalCode }),
      ...(inputs.phone && { phone: inputs.phone }),
    };

    if (formValidatedOk()) {
      dispatch(fetchingStart());
      try {
        const res = await publicRequest.put(`/users/${user._id}`, updatedData, {
          headers: { token: `Bearer ${user.accessToken}` },
        });
        dispatch(fetchingEnd());
        setOpenSnackBar(true);
      } catch (error) {
        dispatch(fetchingFailure(error.response?.data));
      }
    }
  };
  useEffect(() => {
    setInputs({
      email: user.email,
      ...(user.city && { city: user.city }),
      ...(user.password && { password: user.password }),
      ...(user.name && { name: user.name }),
      ...(user.address && { address: user.address }),
      ...(user.postalCode && { postalCode: user.postalCode }),
      ...(user.phone && { phone: user.phone }),
    });
  }, [user, setInputs]);
  useEffect(() => {
    dispatch(fetchingEnd());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Container>
        <Title>Ustawienia</Title>
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
            name="email"
            label="e-mail"
            disabled
            value={inputs.email}
            error={errors.email}
            onChange={handleInputChange}
            // defaultValue="Hello World"
          />

          <Input
            name="password"
            label="hasło"
            type="password"
            value={inputs.password}
            error={errors.password}
            onChange={handleInputChange}
          />
          <Input
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
            <Button
              onClick={(e) => handleCreateButtonClick(e)}
              filled
              disabled={isFetching}
              style={{ float: "right" }}
            >
              ZAPISZ
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
          {errorMsg && errorMsg.length > 0 && <Error>{errorMsg}</Error>}
        </Form>
      </Container>
      <Footer />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Zapisano pomyślnie.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserSettings;
