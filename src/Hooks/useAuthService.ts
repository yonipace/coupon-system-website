import axios from "axios";
import { useDispatch } from "react-redux";
import { CompanyModel } from "../Models/CompanyModel";
import { CredentialsModel } from "../Models/CredentialsModel";
import { CustomerModel } from "../Models/CustomerModel";
import { login, register, Role } from "../Redux/Reducers/authSlice";
import appConfig from "../Utils/Config";

const useAuthService = () => {
  const dispatch = useDispatch();

  const registerClient = async (
    client: CompanyModel | CustomerModel,
    role: Role
  ) => {
    const response = await axios.post<string>(
      appConfig.registerUrl + Role[role].toLowerCase(),
      client
    );
    console.log(appConfig.registerUrl + Role[role].toLowerCase());

    const token = response.data;
    // save the received token in global state
    dispatch(register(token));
  };
  const loginClient = async (credentials: CredentialsModel) => {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    console.log(token);
    // save the received token in global state
    dispatch(login(token));
  };

  return {
    registerClient,
    loginClient,
  };
};

export default useAuthService;
