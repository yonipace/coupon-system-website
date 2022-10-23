import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesView from "../Components/Main/AdminView/CompaniesView";
import CustomersView from "../Components/Main/AdminView/CustomersView";
import CouponsView from "../Components/Main/CompanyView/CouponsView";
import CouponMarket from "../Components/Main/CustomerView/CouponMarket";
import PurchasedCoupons from "../Components/Main/CustomerView/PurchasedCoupons";
import Home from "../Components/Main/Home/Home";
import Login from "../Components/Main/LoginView/Login";
import SignUp from "../Components/Main/LoginView/SignUp";
import AdminRoutes from "./AdminRoutes";
import CompanyRoutes from "./CompanyRoutes";
import CustomerRoutes from "./CustomerRoutes";

const Routing = () => {
  return (
    <Routes>
      <Route element={<CustomerRoutes />}>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/customer/market" element={<CouponMarket />} />
        <Route path="/customer/purchased" element={<PurchasedCoupons />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Route>
      <Route element={<CompanyRoutes />}>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/company/coupons" element={<CouponsView />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Route>
      <Route element={<AdminRoutes />}>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/admin/companies" element={<CompaniesView />} />
        <Route path="/admin/customers" element={<CustomersView />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routing;
