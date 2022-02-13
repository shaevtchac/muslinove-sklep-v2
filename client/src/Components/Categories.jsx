import styled from "@emotion/styled";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
const Container = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  justify-content: space-between;
  gap: 1rem;
  ${mobile({ padding: "0", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
