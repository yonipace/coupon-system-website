import { Unpublished } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CompaniesView from "../Components/Main/AdminView/CompaniesView";
import CustomersView from "../Components/Main/AdminView/CustomersView";
import AdminView from "../Components/Main/AdminView/MainView";
import CouponsView from "../Components/Main/CompanyView/CouponsView";
import CompanyView from "../Components/Main/CompanyView/MainView";
import CouponMarket from "../Components/Main/CustomerView/CouponMarket";
import CustomerView from "../Components/Main/CustomerView/MainView";
import PurchasedCoupons from "../Components/Main/CustomerView/PurchasedCoupons";
import Home from "../Components/Main/Home/Home";
import Login from "../Components/Main/LoginView/Login";
import SignUp from "../Components/Main/LoginView/SignUp";
import { Role } from "../Redux/Reducers/authSlice";
import { getDetails } from "../Service/DetailService";

const Routing = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const clientDetails = getDetails();
  const role = clientDetails.role;
  const [routes, setRoutes] = useState<any>();

  // const unProtectedRoutes = (
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/signup" element={<SignUp />} />
  //     <Route path="/*" element={<Navigate to="/login" />} />
  //   </Routes>
  // );
  // const adminRoutes = (
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/signup" element={<SignUp />} />
  //     <Route path="/home" element={<Home />} />
  //     <Route path="/home/admin" element={<AdminView />} />
  //     <Route path="/admin/companies" element={<CompaniesView />} />
  //     <Route path="/admin/customers" element={<CustomersView />} />
  //   </Routes>
  // );
  // // const companyRoutes = (
  // // <Routes>
  // //   {/* <Route path="/login" element={<Login />} /> */}
  // //   {/* <Route path="/signup" element={<SignUp />} /> */}
  // //   <Route path="/home" element={<Home />} />
  // //   <Route path="/company" element={<CompanyView />} />
  // //   <Route path="/company/coupons" element={<CouponsView />} />
  // //   <Route path="/*" element={<Navigate to="/home" />} />
  // // </Routes>
  // // );

  useEffect(() => {
    if (!isLoggedIn) {
      setRoutes(
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      );
      return;
    }
    if (role.toString() === Role[Role.ADMIN]) {
      setRoutes(
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/admin" element={<AdminView />} />
          <Route path="/admin/companies" element={<CompaniesView />} />
          <Route path="/admin/customers" element={<CustomersView />} />
        </Routes>
      );
      return;
    }
    if (role.toString() === Role[Role.COMPANY]) {
      setRoutes(
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/company" element={<CompanyView />} />
          <Route path="/company/coupons" element={<CouponsView />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      );
      return;
    }
    if (role.toString() === Role[Role.CUSTOMER]) {
      setRoutes("");
      return;
    }
    // setRoutes(unProtectedRoutes);
  }, [role, token, isLoggedIn]);

  return routes;
  // <div>
  //   {!token && (
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<SignUp />} />
  //       <Route path="/*" element={<Navigate to="/login" />} />
  //     </Routes>
  //   )}
  //   {token && role === Role.ADMIN && (
  //     <Routes>
  //       <Route path="/admin" element={<AdminView />} />
  //       <Route path="/admin/companies" element={<CompaniesView />} />
  //       <Route path="/admin/customers" element={<CustomersView />} />
  //     </Routes>
  //   )}
  //   {token && role === Role.COMPANY && (
  //     <Routes>
  //       <Route path="/company" element={<CompanyView />} />
  //       <Route path="/company/coupons" element={<CouponsView />} />
  //     </Routes>
  //   )}
  //   {token && role === Role.CUSTOMER && (
  //     <Routes>
  //       <Route path="/customer" element={<CustomerView />} />
  //       <Route path="/customer/purchased" element={<PurchasedCoupons />} />
  //       <Route path="/customer/market" element={<CouponMarket />} />
  //     </Routes>
  //   )}
  // </div>
};

export default Routing;
