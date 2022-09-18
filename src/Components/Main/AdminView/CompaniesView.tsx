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

const CompaniesView = () => {
  const [companies, setCompanies] = useState([]);
  const adminService = useAdminService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  useEffect(() => {
    (async () => {
      adminService.getAllCompanies().then(
        (arr) => setCompanies(arr),
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
          <h2>Companies</h2>
          <AddClient role={Role.COMPANY} />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Id</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>

                <TableCell>
                  {<DeleteClient id={row.id} role={Role.COMPANY} />}
                </TableCell>
                <TableCell>
                  {
                    <UpdateClient
                      {...row}
                      client={Role.COMPANY}
                      companyName={row.name}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CompaniesView;
