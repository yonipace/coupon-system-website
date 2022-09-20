import { CompanyModel } from "./CompanyModel";

export interface CouponModel {
  id?: number;
  category: Category;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  price: number;
  image?: string;
  company?: CompanyModel;
}

export enum Category {
  ELECTRICITY,
  FOOD,
  RESTAURANT,
  VACATION,
  HOTEL,
  CARS,
}
