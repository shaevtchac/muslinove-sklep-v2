import styled from "styled-components";
import { Card, Img, Button, Input, Label } from "../components/Reusables";
import { Link } from "react-router-dom";
import {
  CalendarToday,
  EmailOutlined,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import isEmail from "validator/es/lib/isEmail";
import { useForm } from "../components/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1``;

const UserContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;
const Show = styled(Card)`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;
const UserHeader = styled.div`
  margin-left: 10px;
`;
const UserName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;
const UserTitle = styled.div`
  font-size: 0.9rem;
  color: gray;
`;

const Bottom = styled.div`
  display: grid;
  gap: 5px;
  margin-top: 10px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const DetailTitle = styled.div`
  margin-top: 8px;
  font-weight: 600;
`;
const DetailInfo = styled.span``;
const Update = styled(Card)`
  flex: 2;
`;
const UpdateTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;
const FormLeft = styled.div``;
const UserUpdateItem = styled.div`
  display: grid;
  gap: 5px;
  margin-top: 10px;
`;

const FormRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ImgUpload = styled.div`
  display: flex;
  align-items: center;
`;
const ImgUpd = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const User = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === userId)
  );
  const dispatch = useDispatch();
  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({ ...inputs, id: userId }, dispatch);
  };
  const inputsInitialState = {
    email: user.email,
    name: user.name,
    postalCode: user.postalCode,
    city: user.city,
    address: user.address,
    phone: user.phone,
  };
  const formValidatedOk = (inputValues = inputs) => {
    let temp = { ...errors };

    if ("email" in inputValues)
      temp.email = inputValues.email
        ? isEmail(inputValues.email)
          ? ""
          : "Nieprawidłowy adres e-mail."
        : "Pole wymagane.";

    setErrors({ ...temp });
    if (inputValues == inputs) return Object.values(temp).every((x) => x == "");
  };
  const { inputs, setInputs, errors, setErrors, handleInputChange, resetForm } =
    useForm(inputsInitialState, true, formValidatedOk);

  return (
    <Container>
      <TitleContainer>
        <Title>Edycja Użytkownika</Title>
        <Link to="/nowy_uzytkownik">
          <Button>Utwórz</Button>
        </Link>
      </TitleContainer>
      <UserContainer>
        <Show>
          <Top>
            {/* <Img
              src="data:image/jpeg;base64,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"
              alt=""
            /> */}
            {/* <UserHeader> */}
            <UserName>{user.name}</UserName>
            {/* <UserTitle>Mentorka Zatraconych</UserTitle> */}
            {/* </UserHeader> */}
          </Top>
          <Bottom>
            {/* <DetailTitle>Szczegóły konta:</DetailTitle> */}
            {/* <InfoWrapper>
              <PermIdentity fontSize="small" />
              <DetailInfo>Anna6969</DetailInfo>
            </InfoWrapper> */}
            {/* <InfoWrapper>
              <CalendarToday fontSize="small" />
              <DetailInfo>10.12.1999</DetailInfo>
            </InfoWrapper> */}
            <DetailTitle>Dane kontaktowe:</DetailTitle>
            <InfoWrapper>
              <PhoneAndroid fontSize="small" />
              <DetailInfo>{user.phone || "Nie podano"}</DetailInfo>
            </InfoWrapper>
            <InfoWrapper>
              <EmailOutlined fontSize="small" />
              <DetailInfo>{user.email}</DetailInfo>
            </InfoWrapper>
            <InfoWrapper>
              <LocationSearching fontSize="small" />
              <DetailInfo>
                {user.address}, {user.postalCode} {user.city}
              </DetailInfo>
            </InfoWrapper>
          </Bottom>
        </Show>
        <Update>
          <UpdateTitle>Edycja:</UpdateTitle>
          <Form>
            <FormLeft>
              <UserUpdateItem>
                <Input
                  name="name"
                  label="imię i nazwisko"
                  value={inputs.name}
                  error={errors.name}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Input
                  required
                  name="email"
                  label="e-mail"
                  value={inputs.email}
                  error={errors.email}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>

              <UserUpdateItem>
                <Input
                  name="phone"
                  label="nr telefonu"
                  value={inputs.phone}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Input
                  name="postalCode"
                  label="kod pocztowy"
                  value={inputs.postalCode}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Input
                  name="city"
                  label="miejscowość"
                  value={inputs.city}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Input
                  name="address"
                  label="ulica, nr domu"
                  value={inputs.address}
                  onChange={handleInputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Button onClick={handleUpdateUser}>Zapisz</Button>
              </UserUpdateItem>
            </FormLeft>
          </Form>
        </Update>
      </UserContainer>
    </Container>
  );
};

export default User;
