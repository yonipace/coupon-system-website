import { SvgIconComponent } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export interface MenuItemModel {
  text: string;
  icon?: SvgIconComponent;
  link: string;
}

export const adminMenuItems = [
  {
    text: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    text: "Companies",
    link: "/admin/companies",
    icon: BusinessIcon,
  },
  {
    text: "Customers",
    link: "/admin/customers",
    icon: GroupIcon,
  },
  // {
  //   text: "Add New Client",
  //   link: "/admin/add",
  //   icon: AddCircleIcon,
  // },
];
export const companyMenuItems = [
  {
    text: "Home",
    link: "/home",
    icon: HomeIcon,
  },
  {
    text: "Coupons",
    link: "/company/coupons",
    icon: LocalActivityIcon,
  },
  // {
  //   text: "Add Coupon",
  //   link: "/company/coupons/add",
  //   icon: AddCircleIcon,
  // },
];
export const customerMenuItems = [
  {
    text: "Home",
    link: "/customer",
    icon: HomeIcon,
  },
  {
    text: "Purchased Coupons",
    link: "/customer/purchased",
    icon: LocalActivityIcon,
  },
  {
    text: "Coupon Market",
    link: "/customer/market",
    icon: StorefrontIcon,
  },
];
