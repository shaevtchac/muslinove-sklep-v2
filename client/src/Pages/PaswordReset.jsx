import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { Form } from "../Hooks/useForm";
import { resetPassword } from "../redux/apiCalls";
import { fetchingEnd } from "../redux/userRedux";
import { Button, Card, Input, Title } from "../Reusables/StyledParts";

const STitle = styled(Title)`
  text-align: center;
  margin-block: 1rem;
`;

const SCard = styled(Card)`
  max-width: 300px;
  margin: 0 auto;
`;

const PaswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetPassword(dispatch, { email })) setEmailSent(true);
  };

  useEffect(() => {
    dispatch(fetchingEnd());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <STitle>Odzyskiwanie hasła</STitle>
      <SCard>
        {!emailSent && (
          <Form onSubmit={handleSubmit}>
            <span>
              Po kliknięciu przycisku "Wyślij" na podany niżej adres e-mail
              zostanie wysłany link do zresetowania hasła.
            </span>
            <Input
              fullWidth
              value={email}
              error={user.error}
              label="Adres e-mail"
              name="email"
              helperText={user.errorMsg}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: "1rem" }}
            />
            <br />
            <Button
              style={{ width: "100%", marginTop: "1rem" }}
              filled
              disabled={user.isFetching}
              type="submit"
            >
              Wyślij
            </Button>
          </Form>
        )}
        {emailSent && (
          <p>
            Wiadomość e-mail wysłana. Otwórz swoją skrzynkę pocztową i postępuj
            zgodnie z instrukcjami zawartmi w wiadomości od nas.
          </p>
        )}
      </SCard>
    </>
  );
};

export default PaswordReset;
