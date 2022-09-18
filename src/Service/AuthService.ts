import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ClientModel } from "../Models/ClientModel";
import { CredentialsModel } from "../Models/CredentialsModel";
import { login, logout, register } from "../Redux/Reducers/authSlice";
import { RootState } from "../Redux/Store/Store";

import appConfig from "../Utils/Config";

class AuthService {
  dispatch = useDispatch();
  state = useSelector((state: RootState) => state);

  public async register(client: ClientModel): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, client);
    const token = response.data;
    console.log(token);
    // save the received token in global state
    this.dispatch(register(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    console.log(token);
    // save the received token in global state
    this.dispatch(login(token));
  }

  public logout(): void {
    // loose the token
    this.dispatch(logout);
  }
}

const authService = new AuthService();

export default authService;
