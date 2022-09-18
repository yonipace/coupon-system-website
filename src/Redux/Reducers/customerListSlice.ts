import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerModel } from "../../Models/CustomerModel";

export interface CustomerListState {
  CustomerList: CustomerModel[];
}

const initialState: CustomerListState = {
  CustomerList: [],
};

export const CustomerListSlice = createSlice({
  name: "CustomerList",
  initialState,
  reducers: {
    setCustomerList: (state, action: PayloadAction<CustomerModel[]>) => {
      state.CustomerList = action.payload;
    },
    addCustomerToStore: (state, action: PayloadAction<CustomerModel>) => {
      state.CustomerList.push(action.payload);
    },
    updateCustomerInStore: (state, action: PayloadAction<CustomerModel>) => {
      const indexToUpdate = state.CustomerList.findIndex(
        (t) => t.id === action.payload.id
      );
      if (indexToUpdate >= 0)
        state.CustomerList[indexToUpdate] = action.payload;
    },
    removeCustomer: (state, action: PayloadAction<number>) => {
      const indexToDelete = state.CustomerList.findIndex(
        (t) => t.id === action.payload
      );
      if (indexToDelete >= 0) state.CustomerList.splice(indexToDelete, 1);
    },
  },
});

export const {
  setCustomerList,
  addCustomerToStore,
  updateCustomerInStore,
  removeCustomer,
} = CustomerListSlice.actions;

export const getCustomers = (state: any) => {
  state.CustomerListState.CustomerList();
};

export default CustomerListSlice.reducer;
