import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export enum Role {
  ADMIN,
  COMPANY,
  CUSTOMER,
}

export interface TokenValues {
  exp: number;
  iat: number;
  id: number;
  name: string;
  role: Role;
  sub: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  id: number;
  email: string;
  name: string;
  role: Role;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: "",
  id: 0,
  email: "",
  name: "",
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      //save token to local storage
      localStorage.setItem("token", action.payload);
      if (state.token) {
        const decodedToken: TokenValues = jwtDecode(state.token);
        state.id = decodedToken.id;
        state.name = decodedToken.name;
        state.role = decodedToken.role;
      }
    },
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      //save token to local storage
      localStorage.setItem("token", action.payload);
      if (state.token) {
        const decodedToken: TokenValues = jwtDecode(state.token);
        state.id = decodedToken.id;
        state.name = decodedToken.name;
        state.role = decodedToken.role;
      }
    },
    logout: (state: AuthState) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state = initialState;

      //this method is used by the root reducer to clear the app state when logging out
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
