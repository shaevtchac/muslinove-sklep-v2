import styled from "styled-components";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

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

export function Input({ name, label, value, error, onChange, ...others }) {
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...others}
    />
  );
}
export const EditInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
`;

export const ColorDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: 0.5px solid lightgray;
`;
