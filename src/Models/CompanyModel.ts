import { ClientModel } from "./ClientModel";
import { CouponModel } from "./CouponModel";

export interface CompanyModel extends ClientModel {
  name: string;
  coupons?: CouponModel[];
}
