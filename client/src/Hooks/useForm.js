import { Box } from "@mui/material";
import { useState } from "react";

export const useForm = (
  initialInputStates,
  validateOnChange = false,
  validateFunc
) => {
  const [inputs, setInputs] = useState(initialInputStates);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
    if (validateOnChange) validateFunc({ [name]: value });
  };
  const resetForm = () => {
    setInputs(initialInputStates);
    setErrors({});
  };
  return { inputs, setInputs, errors, setErrors, handleInputChange, resetForm };
};

export const Form = ({ children, ...other }) => {
  return (
    <Box component="form" noValidate autoComplete="on" {...other}>
      {children}
    </Box>
  );
};
