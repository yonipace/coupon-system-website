import { Role } from "../Redux/Reducers/authSlice";

export interface CredentialsModel {
  email: string;
  password: string;
  role: string;
}
