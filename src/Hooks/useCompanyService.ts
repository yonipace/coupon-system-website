import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CouponModel } from "../Models/CouponModel";

import {
  addCouponToStore,
  removeCoupon,
  setCouponList,
  updateCouponInStore,
} from "../Redux/Reducers/couponListSlice";
import { RootState } from "../Redux/Store/Store";
import appConfig from "../Utils/Config";

const useCompanyService = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const couponList = state.couponList.CouponList;

  const getAllCoupons = async () => {
    if (couponList.length === 0) {
      // fetch the coupons:
      const response = await axios.get<CouponModel[]>(
        appConfig.companyCouponsUrl
      ); // waiting
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

  const addCoupon = async (coupon: CouponModel) => {
    // Send coupon to server
    const response = await axios.post<CouponModel>(
      appConfig.companyCouponsUrl,
      coupon
    );
    const addedCoupon = response.data;
    // update redux global state
    dispatch(addCouponToStore(addedCoupon));
  };

  const updateCoupon = async (coupon: CouponModel) => {
    // Senf coupon to server for update
    const response = await axios.put<CouponModel>(
      appConfig.companyCouponsUrl,
      coupon
    );
    const updatedCoupon = response.data;
    // Update redux global state
    dispatch(updateCouponInStore(updatedCoupon));
  };

  const deleteCoupon = async (id: number) => {
    // Delete in backend
    await axios.delete(appConfig.companyCouponsUrl, {
      params: {
        id,
      },
    });
    dispatch(removeCoupon(id));
  };

  return {
    getAllCoupons,
    getOneCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
  };
};

export default useCompanyService;
