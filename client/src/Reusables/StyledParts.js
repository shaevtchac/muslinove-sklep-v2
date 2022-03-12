import styled from "@emotion/styled";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ButtonBack, ButtonNext } from "pure-react-carousel";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import * as colors from "./Constants/Colors";
import { css } from "@emotion/react";

export const Title = styled.h1`
  font-weight: 700;
  font-size: calc(0.6rem + 2vw);
  text-transform: uppercase;
  line-height: 1.1;
  color: ${colors.TEXT_COLOR_LIGHT};
`;

export const Card = styled.div`
  background-color: ${colors.WHITE_TRANSPARENT_50};
  -webkit-box-shadow: -2px 2px 6px 0px black;
  -moz-box-shadow: -2px 2px 6px 0px black;
  box-shadow: -2px 2px 6px 0px black;
  padding: 1rem;
  column-count: 3;
  column-width: 40ch;
  column-gap: 2rem;
  column-rule: 1px solid ${colors.BODY_COLOR_DARK};
`;

export const TextCard = styled(Card)`
  & p {
    font-size: calc(0.55rem + 0.3vw);
    text-align: justify;
    margin-top: 0.75rem;
    font-weight: 400;
    line-height: 1.7;
    ${mobile({ lineHeight: "1.5", marginTop: "0.4rem" })}

    color: ${colors.TEXT_COLOR_DARK};
    &:nth-of-type(1) {
      font-weight: 800;
      margin-top: 0;
    }

    &:nth-of-type(2)::first-letter {
      font-size: calc(3.5rem + 0.5vw);
      padding: 5px;
      line-height: calc(1.5rem + 1vw);
      float: left;
      font-family: "Engagement";
      color: ${colors.BODY_COLOR_LIGHT};
    }
  }
`;

export const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) =>
    props.filled ? "none" : "1px solid " + colors.BODY_COLOR_DARK};
  background-color: ${(props) =>
    props.filled ? colors.BODY_COLOR_DARK : colors.WHITE_TRANSPARENT_50};
  color: ${(props) => (props.filled ? "white" : colors.TEXT_COLOR_DARK)};
  -webkit-box-shadow: -1px 1px 4px 0px black;
  -moz-box-shadow: -1px 1px 4px 0px black;
  box-shadow: -1px 1px 4px 0px black;
  transition: 300ms ease-in;
  &:hover {
    background-color: ${(props) =>
      props.filled ? colors.TEXT_COLOR_DARK : colors.WHITE_TRANSPARENT_70};
  }
  &:disabled {
    color: gray;
    background-color: white;
    cursor: not-allowed;
  }
`;

export const SLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const navButtonStyle = css`
  background-color: hsla(0, 0%, 100%, 0.5);
  border: 0;
  border-radius: 50%;
  display: block;
  width: 44px;
  height: 44px;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s;
  ${mobile({ width: "30px", height: "30px", padding: "9px" })}
`;

const SButtonBack = styled(ButtonBack)`
  ${navButtonStyle}
  left: 5px;
`;
const SButtonNext = styled(ButtonNext)`
  ${navButtonStyle}
  right: 5px;
`;

export function NiceButtonBack() {
  return (
    <SButtonBack>
      <ArrowBackIosNew sx={{ fontSize: { xs: "small", sm: 24 } }} />
    </SButtonBack>
  );
}

export function NiceButtonNext() {
  return (
    <SButtonNext>
      <ArrowForwardIos sx={{ fontSize: { xs: "small", sm: 24 } }} />
    </SButtonNext>
  );
}
