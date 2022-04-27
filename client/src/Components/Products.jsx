import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import { Title } from "../Reusables/StyledParts";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
`;
const ProductWrap = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Products = ({ favorites, cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const favoriteProducts = useSelector((state) => state.favorites.products);
  useEffect(() => {
    const getProducts = async () => {
      if (favorites) {
        setProducts(favoriteProducts);
      } else {
        try {
          const res = await publicRequest.get(
            cat ? `products?category=${cat}` : "products"
          );
          setProducts(res.data);
        } catch (error) {}
      }
    };
    getProducts();
  }, [cat, favoriteProducts, favorites, user]);
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
