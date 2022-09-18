import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";

const AlertPopup = () => {
  const state = useSelector((state: RootState) => state);
  const alertState = state.alertState;
  const text = alertState.text;
  const type = alertState.type;

  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: "fixed",
          top: "50px",
          left: "30%",
          zIndex: 10,
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
