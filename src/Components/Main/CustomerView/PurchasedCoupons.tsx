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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Category, CouponModel } from "../../../Models/CouponModel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useCustomerService from "../../../Hooks/useCustomerService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const PurchasedCoupons = () => {
  const { getAllCoupons } = useCustomerService();
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
      getAllCoupons().then(
        (arr) => setCoupons(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
      doFilter();
    })();
  }, [getAllCoupons, getErrorMessage, setAlert]);

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
        <h2>Purchased Coupons </h2>

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
                <TableCell>
                  <strong>Company</strong>
                </TableCell>
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
                    <TableCell>{row.company.name}</TableCell>
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
                      colSpan={7}
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

export default PurchasedCoupons;
