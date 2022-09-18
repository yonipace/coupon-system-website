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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useCustomerService from "../../../Hooks/useCustomerService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const PurchasedCoupons = () => {
  const { getAllCoupons } = useCustomerService();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  useEffect(() => {
    (async () => {
      getAllCoupons().then(
        (arr) => setCoupons(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
    })();
  }, [getAllCoupons, getErrorMessage, setAlert]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        px={2}
      >
        <h2>Purchased Coupons</h2>
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
              {coupons.map((row) => (
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
