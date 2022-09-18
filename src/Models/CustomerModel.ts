import { ClientModel } from "./ClientModel";
import { CouponModel } from "./CouponModel";

export interface CustomerModel extends ClientModel {
  firstName: string;
  lastName: string;
  coupons?: CouponModel[];
}
