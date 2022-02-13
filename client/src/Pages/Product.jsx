import { Add, Remove } from "@mui/icons-material";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { colors } from "../data";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import parse from "html-react-parser";
import { Button, Title } from "../Reusables/StyledParts";
import * as templateColors from "../Reusables/Constants/Colors";
import ProductSlider from "../Components/ProductSlider";

const Container = styled.div`
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const SliderContainer = styled.div`
  width: 66%;
  position: relative;
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Desc = styled.div`
  margin: 20px 0;
  line-height: 1.7;
  font-size: calc(0.8rem + 0.3vw);
`;
const Price = styled.span`
  font-size: 2.5rem;
  ${mobile({ fontSize: "2rem" })}
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: 0.5px solid lightgray;
`;
// const FilterSize = styled.select`
//   margin-left: 5px;
//   padding: 5px;
// `;
// const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  gap: 3px;
`;
const Amount = styled.span`
  width: 30px;
  background-color: white;
  height: 30px;
  border-radius: 5px;
  border: 1px solid teal;
  display: grid;
  place-items: center;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  // const [size, setSize] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (par) => {
    if (par === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (par === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, color }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <SliderContainer>
          {product.images && <ProductSlider imgSrcArray={product.images} />}
        </SliderContainer>
        {/* <Image src={product.img} /> */}
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc && parse(product.desc)}</Desc>

          <Price>
            <FilterTitle>Cena: </FilterTitle>
            {product.price} zł
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Kolor</FilterTitle>
              {product.color?.map((colorId) => (
                <FilterColor
                  onClick={() => setColor(colorId)}
                  key={colorId}
                  color={
                    colors.find((colorItem) => colorItem.id === colorId)
                      .colorCSS
                  }
                />
              ))}
            </Filter>
            {/* <Filter>
              <FilterTitle>Rozmiar</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              />
              <Amount>{quantity}</Amount>
              <Add
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              />
            </AmountContainer>
            <Button type="filled" onClick={handleAddToCart}>
              DO KOSZYKA
            </Button>
          </AddContainer>
        </InfoContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
