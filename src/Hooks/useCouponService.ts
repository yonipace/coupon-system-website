import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CouponModel } from "../Models/CouponModel";

import { setCouponList } from "../Redux/Reducers/couponListSlice";
import { RootState } from "../Redux/Store/Store";
import appConfig from "../Utils/Config";

const useCouponService = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const couponList = state.couponList.CouponList;

  const getAllCoupons = async () => {
    if (couponList.length === 0) {
      // fetch the coupons:
      const response = await axios.get<CouponModel[]>(appConfig.couponsUrl); // waiting
      const coupons = response.data;

      //this is checked to avoid infinite calls to the server when the array is empty
      if (coupons.length > 0) {
        dispatch(setCouponList(coupons));
        return coupons;
      }

      return couponList;
    }
    return couponList;
  };
  const getOneCoupon = async (id: number) => {
    // const response = await axios.get<CouponModel>(appConfig.couponsUrl + id);
    // const coupon = response.data;
    // return coupon;
    const coupon = couponList.find((p) => p.id === id);
    return coupon;
  };

  return {
    getAllCoupons,
    getOneCoupon,
  };
};

export default useCouponService;
