import styled from "@emotion/styled";
import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import { colors } from "../data";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
  color: white;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Favorites = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("najnowsze");
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Title>Ulubione</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtruj listę produktów</FilterText>
          <Select
            name="color"
            onChange={handleFilters}
            defaultValue={"DEFAULT"}
          >
            <Option disabled value="DEFAULT">
              Kolor
            </Option>
            {colors.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sortuj listę produktów</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="najnowsze">Najnowsze</Option>
            <Option value="rosn"> Cena (rosnąco)</Option>
            <Option value="malej"> Cena (malejąco)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products favorites filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default Favorites;
