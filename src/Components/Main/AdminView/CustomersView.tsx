import {
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAdminService from "../../../Hooks/useAdminService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";
import { Role } from "../../../Redux/Reducers/authSlice";
import AddClient from "./AddClient";
import DeleteClient from "./DeleteClient";
import UpdateClient from "./UpdateClient";

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);
  const adminService = useAdminService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  useEffect(() => {
    (async () => {
      adminService.getAllCustomers().then(
        (arr) => setCustomers(arr),
        (err) => setAlert(getErrorMessage(err), "error")
      );
    })();
  }, [adminService, getErrorMessage, setAlert]);

  return (
    <Container
      component={Card}
      elevation={6}
      sx={{
        maxWidth: "md",
        mt: 3,
        p: 3,
        alignItems: "center",
        display: "flex",
      }}
    >
      <TableContainer sx={{ maxHeight: 500 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          px={2}
        >
          <h2>Customers</h2>
          <AddClient role={Role.CUSTOMER} />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Id</strong>
              </TableCell>
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {<DeleteClient id={row.id} role={Role.CUSTOMER} />}
                </TableCell>
                <TableCell>
                  {<UpdateClient {...row} client={Role.CUSTOMER} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomersView;
