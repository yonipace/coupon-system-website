import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertStateModel {
  text: string;
  type: AlertColor;
  open?: boolean;
}

const initialState: AlertStateModel = {
  text: "",
  type: null,
  open: false,
};

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlertData: (state, action: PayloadAction<AlertStateModel>) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
  },
});

export const { setAlertData } = alertSlice.actions;

export default alertSlice.reducer;
