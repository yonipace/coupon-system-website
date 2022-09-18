import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Category, CouponModel } from "../Models/CouponModel";
import {
  addCouponToStore,
  setCouponList,
} from "../Redux/Reducers/couponListSlice";
import { RootState } from "../Redux/Store/Store";
import appConfig from "../Utils/Config";

class CustomerService {
  dispatch = useDispatch();
  state = useSelector((state: RootState) => state);
  couponList = this.state.couponList.CouponList;

  public async getAllCoupons(): Promise<CouponModel[]> {
    // If no coupons in global state
    if (this.couponList.length === 0) {
      // fetch the coupons:
      const response = await axios.get<CouponModel[]>(appConfig.customerUrl); // waiting
      const coupons = response.data;

      // save coupons in global state
      // couponstore.dispatch({ type: CouponsActionType.FetchCoupons, payload: coupons });
      this.dispatch(setCouponList(coupons));

      // Return the coupons
      return coupons;
    }

    // If global state has the coupons - return from global state
    return this.couponList;
  }

  public async getOneCoupon(id: number): Promise<CouponModel> {
    // const response = await axios.get<CouponModel>(appConfig.couponsUrl + id);
    // const coupon = response.data;
    // return coupon;
    const coupon = this.couponList.find((p) => p.id === id);
    return coupon;
  }

  public async purchaseCoupon(coupon: CouponModel): Promise<void> {
    // Send coupon to server
    const response = await axios.post<CouponModel>(
      appConfig.customerUrl + "purchase",
      coupon
    );
    const addedCoupon = response.data;
    // update redux global state
    this.dispatch(addCouponToStore(addedCoupon));
  }

  //this method filters the coupons in the store by category
  public async getAllCouponsByCategory(
    category: Category
  ): Promise<CouponModel[]> {
    // Return the filtered coupons
    return this.couponList.filter((c) => c.category === category);
  }
  //this method filters the coupons in the store by max price
  public async getAllCouponsByMaxPrice(price: number): Promise<CouponModel[]> {
    // Return the filtered coupons
    return this.couponList.filter((c) => c.price <= price);
  }
}

const customerService = new CustomerService();

export default customerService;
