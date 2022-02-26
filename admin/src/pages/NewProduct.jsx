import { useState } from "react";
import styled from "styled-components";
import { Button, EditInput, Label } from "../components/Reusables";

import { addProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
const Container = styled.div`
  flex: 4;
  padding: 20px;
`;
const Title = styled.h1`
  margin-bottom: 15px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 300px;
  gap: 5px;
`;

const Select = styled.select`
  max-width: 60px;
  height: 40px;
  padding: 7px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const NewProduct = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(",").map((item) => item.trim()));
  };
  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    // const fileName = new Date().getTime() + file.name;
  };

  return (
    <Container>
      <Title>Nowy Produkt</Title>
      <Form>
        <Item>
          <Label>Nazwa</Label>
          <EditInput
            type="text"
            name="title"
            placeholder="Nazwa produktu"
            onChange={handleChange}
          />
        </Item>
        <Item>
          <Label>Opis:</Label>
          <EditInput
            type="text"
            name="desc"
            placeholder="opis produktu"
            onChange={handleChange}
          />
        </Item>
        <Item>
          <Label>Cena:</Label>
          <EditInput
            type="number"
            name="price"
            placeholder="cena"
            onChange={handleChange}
          />
        </Item>
        <Item>
          <Label>Kategorie:</Label>
          <EditInput
            type="text"
            placeholder="kategorie oddzielone przecinkami"
            onChange={handleCat}
          />
        </Item>
        <Item>
          <Label>Zdjęcie</Label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Item>
        <Item>
          <Label>Dostępne:</Label>
          <Select name="inStock" id="inStock" onChange={handleChange}>
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </Select>
        </Item>

        <Button onClick={handleCreateButtonClick}>Utwórz</Button>
      </Form>
    </Container>
  );
};

export default NewProduct;
