import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import { Title } from "../Reusables/StyledParts";

const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
`;
const ProductWrap = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `products?category=${cat}` : "products"
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "najnowsze") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "rosn") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <Title style={{ marginBottom: "1rem", textAlign: "center" }}>
        Popularne Produkty
      </Title>
      <ProductWrap>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
              .slice(0, 4)
              .map((item) => <Product item={item} key={item._id} />)}
      </ProductWrap>
    </Container>
  );
};

export default Products;
