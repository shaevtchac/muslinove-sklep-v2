import styled from "styled-components";
import { Link } from "react-router-dom";

export const SLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Button = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  cursor: pointer;
  color: white;
  border-radius: 5px;
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px -5px gray;
  -webkit-box-shadow: 0 0 15px -5px gray;
`;
export const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Input = styled.input`
  border: 1px solid gray;
  height: 1.5rem;
  width: 250px;
  border-radius: 5px;
`;
export const EditInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
`;
