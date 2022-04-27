import Button from "@mui/material/Button";
import MuiSnackBar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import { useState } from "react";

const SnackBar = ({ message, opened, close, undoFunction, type }) => {
  const actionUndo = (
    <>
      <Button color="secondary" size="small" onClick={undoFunction}>
        COFNIJ
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={close}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <MuiSnackBar open={opened} autoHideDuration={6000} onClose={close}>
      <Alert severity={type}>
        {message}
        {undoFunction && typeof undoFunction === "function" ? (
          actionUndo
        ) : (
          <></>
        )}
      </Alert>
    </MuiSnackBar>
  );
};
SnackBar.propTypes = {
  undoFunction: PropTypes.func,
  message: PropTypes.string,
  opened: PropTypes.bool,
  close: PropTypes.func,
  type: PropTypes.oneOf(["info", "error", "warning", "success"]),
};

export const useSnackBar = () => {
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const open = () => {
    setOpened(true);
  };
  const close = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpened(false);
  };

  // const setSnackBarMessage = (message = "") => {
  //   dispatch(setMessage(message));
  // };
  // const setSnackBarType = (message = "") => {
  //   dispatch(setType(message));
  // };

  return {
    SnackBar,
    open,
    close,
    opened,
    message,
    setMessage,
    setType,
    type,
  };
};
