import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../Redux/Reducers/authSlice";
import { getDetails } from "../Service/DetailService";

const CompanyRoutes = () => {
  const token = localStorage.getItem("token");
  const clientDetails = getDetails();
  const role = clientDetails.role;

  console.log(role);

  return token && role.toString() === Role[Role.COMPANY] ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default CompanyRoutes;
