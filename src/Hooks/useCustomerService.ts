import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CouponModel } from "../Models/CouponModel";

import {
  addCouponToStore,
  setCustomerCoupons,
} from "../Redux/Reducers/customerCouponsSlice";
import { RootState } from "../Redux/Store/Store";
import appConfig from "../Utils/Config";

const useCustomerService = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const customerCoupons = state.customerCoupons.CustomerCoupons;

  const getAllCoupons = async () => {
    if (customerCoupons.length === 0) {
      // fetch the coupons:
      const response = await axios.get<CouponModel[]>(
        appConfig.customerCouponsUrl
      ); // waiting
      const coupons = response.data;

      //this is checked to avoid infinite calls to the server when the array is empty
      if (coupons.length > 0) {
        dispatch(setCustomerCoupons(coupons));
        return coupons;
      }

      return customerCoupons;
    }
    return customerCoupons;
  };
  const getOneCoupon = async (id: number) => {
    // const response = await axios.get<CouponModel>(appConfig.couponsUrl + id);
    // const coupon = response.data;
    // return coupon;
    const coupon = customerCoupons.find((p) => p.id === id);
    return coupon;
  };

  const purchaseCoupon = async (coupon: CouponModel) => {
    // Send coupon to server
    const response = await axios.post<CouponModel>(
      appConfig.customerUrl + "/purchase",
      coupon
    );
    const purchasedCoupon = response.data;

    // update redux global state
    dispatch(addCouponToStore(purchasedCoupon));
  };

  return {
    getAllCoupons,
    getOneCoupon,
    purchaseCoupon,
  };
};

export default useCustomerService;
