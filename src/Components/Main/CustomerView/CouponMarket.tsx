import { Grid, List } from "@mui/material";
import { useEffect, useState } from "react";
import useAlert from "../../../Hooks/useAlert";
import useCouponService from "../../../Hooks/useCouponService";
import useNotificationService from "../../../Hooks/useNotificationService";
import { CouponModel } from "../../../Models/CouponModel";
import CouponCard from "./CouponCard";

const CouponMarket = () => {
  const couponService = useCouponService();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  useEffect(() => {
    (async () => {
      couponService.getAllCoupons().then(
        (arr) => setCoupons(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
    })();
  }, [couponService, getErrorMessage, setAlert]);

  return (
    <>
      <h2>Coupon Marketplace</h2>
      <List>
        <Grid container>
          {coupons.map((coupon) => (
            <Grid item xs={12} sm={4}>
              <CouponCard key={coupon.id} {...coupon} />
            </Grid>
          ))}
        </Grid>
      </List>
    </>
  );
};

export default CouponMarket;
