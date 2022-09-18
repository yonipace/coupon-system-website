import jwtDecode from "jwt-decode";
import { TokenValues } from "../Redux/Reducers/authSlice";

export function getDetails(): TokenValues {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return {
    exp: 0,
    iat: 0,
    id: 0,
    name: "",
    role: null,
    sub: "",
  };
}
