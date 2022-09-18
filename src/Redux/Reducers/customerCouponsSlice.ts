import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../../Models/CouponModel";

export interface CustomerCouponsState {
  CustomerCoupons: CouponModel[];
}

const initialState: CustomerCouponsState = {
  CustomerCoupons: [],
};

export const CustomerCouponsSlice = createSlice({
  name: "CustomerCoupons",
  initialState,
  reducers: {
    setCustomerCoupons: (state, action: PayloadAction<CouponModel[]>) => {
      state.CustomerCoupons = action.payload;
    },
    addCouponToStore: (state, action: PayloadAction<CouponModel>) => {
      state.CustomerCoupons.push(action.payload);
    },
    // updateCouponInStore: (state, action: PayloadAction<CouponModel>) => {
    //   const indexToUpdate = state.CustomerCoupons.findIndex(
    //     (t) => t.id === action.payload.id
    //   );
    //   if (indexToUpdate >= 0)
    //     state.CustomerCoupons[indexToUpdate] = action.payload;
    // },
    // removeCoupon: (state, action: PayloadAction<number>) => {
    //   const indexToDelete = state.CustomerCoupons.findIndex(
    //     (t) => t.id === action.payload
    //   );
    //   if (indexToDelete >= 0) state.CustomerCoupons.splice(indexToDelete, 1);
    // },
  },
});

export const { setCustomerCoupons, addCouponToStore } =
  CustomerCouponsSlice.actions;

export const getCoupons = (state: any) => {
  state.CustomerCouponsState.CustomerCoupons();
};

export default CustomerCouponsSlice.reducer;
