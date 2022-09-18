import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authSlice";
import customerListReducer from "../Reducers/customerListSlice";
import companyListReducer from "../Reducers/companyListSlice";
import couponListReducer from "../Reducers/couponListSlice";
import customerCouponsReducer from "../Reducers/customerCouponsSlice";
import alertReducer from "../Reducers/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customerList: customerListReducer,
    companyList: companyListReducer,
    couponList: couponListReducer,
    customerCoupons: customerCouponsReducer,
    alertState: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
