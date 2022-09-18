import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../Redux/Reducers/authSlice";
import { getDetails } from "../Service/DetailService";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const clientDetails = getDetails();
  const role = clientDetails.role;

  return token && role.toString() === Role[Role.ADMIN] ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
