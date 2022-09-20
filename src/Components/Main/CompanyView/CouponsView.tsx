import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Collapse,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import useCompanyService from "../../../Hooks/useCompanyService";
import { Category, CouponModel } from "../../../Models/CouponModel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddCoupon from "./AddCoupon";
import UpdateCoupon from "./UpdateCoupon";
import DeleteCoupon from "./DeleteCoupon";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const CouponsView = () => {
  const companyService = useCompanyService();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [couponsToMap, setCouponsToMap] = useState<CouponModel[]>(coupons);
  const [category, setCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const categories = Object.keys(Category).filter((v) => !isNaN(Number(v)));

  useEffect(() => {
    (async () => {
      companyService.getAllCoupons().then(
        (arr) => setCoupons(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
      doFilter();
    })();
  }, [companyService, getErrorMessage, setAlert]);

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
        <h2>Coupons </h2>

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
        <AddCoupon />
      </Stack>
      <Container
        component={Card}
        elevation={6}
        sx={{
          maxWidth: "lg",
          p: 3,
          alignItems: "center",
          display: "flex",
        }}
      >
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Price ($)</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell>
                  <strong>End Date</strong>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {couponsToMap.map((row) => (
                <>
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{<DeleteCoupon id={row.id} />}</TableCell>
                    <TableCell>{<UpdateCoupon {...row} />}</TableCell>
                    <TableCell>
                      <Button
                        color="inherit"
                        onClick={() => {
                          setIsRowOpen(!isRowOpen);
                        }}
                        endIcon={
                          isRowOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                      >
                        Description
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell></TableCell> */}
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={8}
                    >
                      <Collapse in={isRowOpen}>
                        <Stack direction="row" sx={{ my: 1 }} spacing={2}>
                          <Typography>
                            <strong>Description </strong>
                          </Typography>
                          <Typography>{row.description}</Typography>
                        </Stack>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CouponsView;

export const dummyCoupons: CouponModel[] = [
  {
    title: "title",
    description: "some long text. a llot of text",
    category: Category.ELECTRICITY,
    price: 150,
    startDate: "2022-10-10",
    endDate: "2022-10-10",
    amount: 50,
  },
];
