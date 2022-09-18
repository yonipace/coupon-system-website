import { AlertColor } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlertData } from "../Redux/Reducers/alertSlice";

const useAlert = () => {
  const dispatch = useDispatch();
  const clearAlert = () => {
    dispatch(setAlertData({ text: "", type: null }));
  };
  const setAlert = (text: string, type: AlertColor) => {
    dispatch(setAlertData({ text, type }));
    setTimeout(clearAlert, 5000);
  };
  return { setAlert };
};

export default useAlert;
