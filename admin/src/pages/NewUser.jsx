import styled from "styled-components";
import { Button, EditInput, Label } from "../components/Reusables";
const Container = styled.div`
  flex: 4;
  padding: 20px;
`;
const Title = styled.h1`
  margin-bottom: 15px;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 300px;
  gap: 5px;
`;

const Gender = styled.div`
  margin-top: 10px;
  > Label {
    font-size: 1rem;
  }
`;
const InputRadio = styled.input`
  margin: 0 3px 0 10px;
`;
const Select = styled.select`
  max-width: 60px;
  height: 40px;
  padding: 7px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const NewUser = () => {
  return (
    <Container>
      <Title>Nowy Użytkownik</Title>
      <Form>
        <Item>
          <Label>Imię i Nazwisko</Label>
          <EditInput type="text" placeholder="Jan Niezbędny" />
        </Item>
        <Item>
          <Label>Adres e-mail</Label>
          <EditInput type="text" placeholder="jannn@gmail.com" />
        </Item>
        <Item>
          <Label>Hasło</Label>
          <EditInput type="text" placeholder="haslo" />
        </Item>
        <Item>
          <Label>Nr telefonu</Label>
          <EditInput type="text" placeholder="12345677" />
        </Item>
        <Item>
          <Label>Adres</Label>
          <EditInput type="text" placeholder="Wólka Drążdżewska | Poland" />
        </Item>
        <Item>
          <Label>Płeć</Label>
          <Gender>
            <InputRadio
              type="radio"
              name="gender"
              id="male"
              value="mezczyzna"
            />
            <Label for="male">Mężczyzna</Label>
            <InputRadio
              type="radio"
              name="gender"
              id="female"
              value="kobieta"
            />
            <Label for="female">Kobieta</Label>
            <InputRadio type="radio" name="gender" id="other" value="inne" />
            <Label for="other">Inne</Label>
          </Gender>
        </Item>
        <Item>
          <Label>Konto aktywne:</Label>
          <Select name="active" id="active">
            <option value="tak">Tak</option>
            <option value="nie">Nie</option>
          </Select>
          <Button>Utwórz</Button>
        </Item>
      </Form>
    </Container>
  );
};

export default NewUser;
