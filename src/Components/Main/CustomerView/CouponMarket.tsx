import {
  Button,
  FormControl,
  Grid,
  List,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAlert from "../../../Hooks/useAlert";
import useCouponService from "../../../Hooks/useCouponService";
import useNotificationService from "../../../Hooks/useNotificationService";
import { Category, CouponModel } from "../../../Models/CouponModel";
import CouponCard from "./CouponCard";

const CouponMarket = () => {
  const couponService = useCouponService();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [couponsToMap, setCouponsToMap] = useState<CouponModel[]>(coupons);
  const [category, setCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(0);
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const categories = Object.keys(Category).filter((v) => !isNaN(Number(v)));

  useEffect(() => {
    (async () => {
      couponService.getAllCoupons().then(
        (arr) => setCoupons(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
      doFilter();
    })();
  }, [couponService, getErrorMessage, setAlert]);

  const doFilter = () => {
    let filterCoupons = coupons;
    if (maxPrice > 0) {
      filterCoupons = coupons.filter((c) => c.price <= maxPrice);
    }
    if (category !== "") {
      filterCoupons = filterCoupons.filter(
        (c) => c.category.toString() === Category[parseInt(category)]
      );
    }
    setCouponsToMap(filterCoupons);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        px={2}
      >
        <h2>Coupon Marketplace </h2>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="max price"
            size="small"
            type="number"
            onChange={(e) => {
              setMaxPrice(parseFloat(e.target.value));
            }}
          />
          <FormControl>
            <Select
              size="small"
              value={category}
              // label="Category"
              onChange={(e) => setCategory(e.target.value.toString())}
            >
              {categories.map((k: any) => (
                <MenuItem value={categories.indexOf(k)}>
                  {Category[categories.indexOf(k)].toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Button variant="contained" size="small" onClick={doFilter}>
            Filter
          </Button> */}
          <Button
            variant="outlined"
            onClick={() => {
              setCouponsToMap(coupons);
              setMaxPrice(0);
              setCategory("");
            }}
          >
            clear filters
          </Button>
        </Stack>
      </Stack>
      <List>
        <Grid container>
          {couponsToMap.map((coupon) => (
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
