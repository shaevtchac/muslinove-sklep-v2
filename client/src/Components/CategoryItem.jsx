import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-shadow: 0px 0px 10px black;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  color: gray;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/produkty/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Zobacz</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
