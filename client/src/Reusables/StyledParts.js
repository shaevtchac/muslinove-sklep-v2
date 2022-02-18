import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as colors from "./Constants/Colors";

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
    font-size: 1rem;
    text-align: justify;
    margin-top: 0.75rem;
    font-weight: 400;
    line-height: 1.7;

    color: ${colors.TEXT_COLOR_DARK};
    &:nth-of-type(1) {
      font-weight: 800;
      margin-top: 0;
    }

    &:nth-of-type(2)::first-letter {
      font-size: 5rem;
      padding: 5px;
      line-height: 2.5rem;
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
    props.type === "filled" ? "none" : "1px solid " + colors.BODY_COLOR_DARK};
  background-color: ${(props) =>
    props.type === "filled"
      ? colors.BODY_COLOR_DARK
      : colors.WHITE_TRANSPARENT_50};
  color: ${(props) =>
    props.type === "filled" ? "white" : colors.BODY_COLOR_DARK};
  -webkit-box-shadow: -1px 1px 4px 0px black;
  -moz-box-shadow: -1px 1px 4px 0px black;
  box-shadow: -1px 1px 4px 0px black;
  transition: 300ms ease-in;
  &:hover {
    background-color: ${(props) =>
      props.type === "filled"
        ? colors.TEXT_COLOR_DARK
        : colors.WHITE_TRANSPARENT_70};
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
