import styled from "styled-components";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import * as colors from "./Constants/Colors";
import { format, register } from "timeago.js";

const localeFunc = (number, index, totalSec) => {
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["w tej chwili", "za chwilę"],
    ["%s sekund temu", "za %s sekund"],
    ["1 minutę temu", "za 1 minutę"],
    ["%s minut temu", "za %s minut"],
    ["1 godzinę temu", "za 1 godzinę"],
    ["%s godzin temu", "za %s godzin"],
    ["1 dzień temu", "za 1 dzień"], // ['wczoraj', 'jutro'],
    ["%s dni temu", "za %s dni"],
    ["1 tydzień temu", "za 1 tydzień"],
    ["%s tygodni temu", "za %s tygodni"],
    ["1 miesiąc temu", "za 1 miesiąc"],
    ["%s miesięcy temu", "za %s miesięcy"],
    ["1 rok temu", "za 1 rok"],
    ["%s lat temu", "za %s lat"],
    ["%s sekundy temu", "za %s sekundy"],
    ["%s minuty temu", "za %s minuty"],
    ["%s godziny temu", "za %s godziny"],
    ["%s dni temu", "za %s dni"],
    ["%s tygodnie temu", "za %s tygodnie"],
    ["%s miesiące temu", "za %s miesiące"],
    ["%s lata temu", "za %s lata"],
  ][index];
};
// register your locale with timeago
register("pl_PL", localeFunc);

export const TimeAgoDate = ({ dbDate }) => {
  return <span>{format(dbDate, "pl_PL")}</span>;
};

export const DateTimeFormatted = ({ dbDate }) => {
  const date = new window.Date(dbDate);
  var options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateFormatted = new Intl.DateTimeFormat("pl-PL", options).format(date);
  return <span>{dateFormatted}</span>;
};

export const SLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
