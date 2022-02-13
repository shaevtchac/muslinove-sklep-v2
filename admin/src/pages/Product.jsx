import styled from "styled-components";
import { Button, Card, Img, Input, Label } from "../components/Reusables";
import { Link, useLocation } from "react-router-dom";
import Chart from "../components/Chart";
import { productData } from "../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethods";
import { DefaultEditor } from "react-simple-wysiwyg";
import sanitizeHtml from "sanitize-html";
import {
  removeProductPicture,
  updateProduct,
  uploadProductPicture,
} from "../redux/apiCalls";
import ProductSlider from "../components/ProductSlider";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;
const Title = styled.h1``;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Top = styled.div`
  display: flex;
  gap: 20px;
`;
const TopLeft = styled.div`
  flex: 1;
`;
const TopRight = styled(Card)`
  flex: 1;
  margin: 20px 0;
`;
const Bottom = styled.div`
  margin-top: 10px;
`;
const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;
const ProductName = styled.div`
  font-weight: 600;
  margin-left: 1rem;
`;
const ProductInfoBottom = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductInfoKey = styled.div`
  font-weight: 300;
`;
const ProductInfoValue = styled.div``;
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  width: 45%;
  display: grid;
  align-items: flex-start;
  gap: 5px;
  > Label {
    margin-top: 5px;
  }
`;
const Select = styled.select`
  max-width: 50px;
`;

const ProductFormRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const ProductSliderContainer = styled.div`
  position: relative;
  width: 100%;
`;
const ProductUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ImgageList = styled.ol`
  margin-top: 1rem;
`;
const ImageListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const ImagelistButton = styled.button`
  border: none;
  background: teal;
  color: white;
  font-weight: bold;
`;
const Product = () => {
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [html, setHtml] = useState("");
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const dispatch = useDispatch();
  const MONTHS = useMemo(
    () => [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paz",
      "Lis",
      "Gru",
    ],
    []
  );
  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleDescChange = (e) => {
    setHtml(e.target.value);
  };
  const handleUpdateButtonClick = (e) => {
    e.preventDefault();
    const desc = sanitizeHtml(html);
    const product = { ...inputs, desc };
    updateProduct(productId, product, dispatch);
  };
  const handleRemoveImageButtonClick = (e, imgNo) => {
    e.preventDefault();
    removeProductPicture(productId, product.images, imgNo, dispatch);
  };
  const handleFileUpload = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    uploadProductPicture(productId, formData, product.images, dispatch);
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  useEffect(() => {
    setHtml(product.desc);
    setInputs(product);
  }, [product.desc, product]);

  // useEffect(() => {
  //   updateProduct(productId, { images }, dispatch);
  // }, [images, productId, dispatch]);

  return (
    <Container>
      <TitleWrapper>
        <Title>Produkt</Title>
        <Link to="/nowy_produkt">
          <Button>Nowy</Button>
        </Link>
      </TitleWrapper>
      <Top>
        <TopLeft>
          <Chart data={pStats} dataKey="Sales" title="Sprzedaż" />
        </TopLeft>
        <TopRight>
          <ProductInfoTop>
            <Img src={product.images[0]} />
            <ProductName>{product.title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoKey>id: </ProductInfoKey>
            <ProductInfoValue>{product._id}</ProductInfoValue>
          </ProductInfoBottom>
          <ProductInfoBottom>
            <ProductInfoKey>Sprzedaż:</ProductInfoKey>
            <ProductInfoValue>5123 zł</ProductInfoValue>
          </ProductInfoBottom>

          <ProductInfoBottom>
            <ProductInfoKey>Dostępny:</ProductInfoKey>
            <ProductInfoValue>{product.inStock}</ProductInfoValue>
          </ProductInfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <ProductForm>
          <ProductFormLeft>
            <Label>Nazwa Produktu:</Label>
            <Input
              type="text"
              name="title"
              defaultValue={product.title}
              onChange={handleChangeInputs}
            />
            <Label>Cena:</Label>
            <Input
              type="number"
              name="price"
              defaultValue={product.price}
              onChange={handleChangeInputs}
            />
            <Label>Dostępny:</Label>
            <Select name="inStock" id="idStock" onChange={handleChangeInputs}>
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </Select>
            <Label>Opis:</Label>
            <DefaultEditor
              value={html}
              name="desc"
              onChange={handleDescChange}
            />

            <Button onClick={handleUpdateButtonClick}>Zapisz</Button>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductSliderContainer>
              <ProductSlider imgSrcArray={product.images} />
            </ProductSliderContainer>
            <ImgageList>
              {product.images.map((imgSrc, index) => (
                <ImageListItem key={imgSrc}>
                  <span>{imgSrc} </span>
                  <span>
                    <ImagelistButton
                      onClick={(e) => handleRemoveImageButtonClick(e, index)}
                    >
                      usuń
                    </ImagelistButton>
                  </span>
                </ImageListItem>
              ))}
            </ImgageList>
            <ProductUpload>
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => handleFileUpload(e)}
              />
            </ProductUpload>
          </ProductFormRight>
        </ProductForm>
      </Bottom>
    </Container>
  );
};

export default Product;
