import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyModel } from "../../Models/CompanyModel";

export interface CompanyListState {
  CompanyList: CompanyModel[];
}

const initialState: CompanyListState = {
  CompanyList: [],
};

export const CompanyListSlice = createSlice({
  name: "CompanyList",
  initialState,
  reducers: {
    setCompanyList: (state, action: PayloadAction<CompanyModel[]>) => {
      state.CompanyList = action.payload;
    },
    addCompanyToStore: (state, action: PayloadAction<CompanyModel>) => {
      state.CompanyList.push(action.payload);
    },
    updateCompanyInStore: (state, action: PayloadAction<CompanyModel>) => {
      const indexToUpdate = state.CompanyList.findIndex(
        (t) => t.id === action.payload.id
      );
      if (indexToUpdate >= 0) state.CompanyList[indexToUpdate] = action.payload;
    },
    removeCompany: (state, action: PayloadAction<number>) => {
      const indexToDelete = state.CompanyList.findIndex(
        (t) => t.id === action.payload
      );
      if (indexToDelete >= 0) state.CompanyList.splice(indexToDelete, 1);
    },
  },
});

export const {
  setCompanyList,
  addCompanyToStore,
  updateCompanyInStore,
  removeCompany,
} = CompanyListSlice.actions;

export const getCompanys = (state: any) => {
  state.CompanyListState.CompanyList();
};

export default CompanyListSlice.reducer;
