import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../../Models/CouponModel";

export interface CouponListState {
  CouponList: CouponModel[];
}

const initialState: CouponListState = {
  CouponList: [],
};

export const CouponListSlice = createSlice({
  name: "CouponList",
  initialState,
  reducers: {
    setCouponList: (state, action: PayloadAction<CouponModel[]>) => {
      state.CouponList = action.payload;
    },
    addCouponToStore: (state, action: PayloadAction<CouponModel>) => {
      state.CouponList.push(action.payload);
    },
    updateCouponInStore: (state, action: PayloadAction<CouponModel>) => {
      const indexToUpdate = state.CouponList.findIndex(
        (t) => t.id === action.payload.id
      );
      if (indexToUpdate >= 0) state.CouponList[indexToUpdate] = action.payload;
    },
    removeCoupon: (state, action: PayloadAction<number>) => {
      const indexToDelete = state.CouponList.findIndex(
        (t) => t.id === action.payload
      );
      if (indexToDelete >= 0) state.CouponList.splice(indexToDelete, 1);
    },
  },
});

export const {
  setCouponList,
  addCouponToStore,
  updateCouponInStore,
  removeCoupon,
} = CouponListSlice.actions;

export const getCoupons = (state: any) => {
  state.CouponListState.CouponList();
};

export default CouponListSlice.reducer;
