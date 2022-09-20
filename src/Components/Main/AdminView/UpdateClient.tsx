import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import useAdminService from "../../../Hooks/useAdminService";
import { Role } from "../../../Redux/Reducers/authSlice";
import EditIcon from "@mui/icons-material/Edit";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

export interface UpdateClientFormProps {
  id: number;
  open?: boolean;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  client: Role;
}

const UpdateClient = (props: UpdateClientFormProps) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(
    props.firstName ? props.firstName : ""
  );
  const [lastName, setLastName] = useState(
    props.lastName ? props.lastName : ""
  );
  const [companyName, setCompanyName] = useState(
    props.companyName ? props.companyName : ""
  );
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const { updateCompany, updateCustomer } = useAdminService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (props.client === Role.COMPANY) {
        await updateCompany({
          id: props.id,
          name: companyName,
          email,
          password,
        });
        setAlert("company updated successfully!", "success");
      }
      if (props.client === Role.CUSTOMER) {
        await updateCustomer({
          id: props.id,
          firstName,
          lastName,
          email,
          password,
        });
        setAlert("customer updated successfully!", "success");
      }
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };
  return (
    <>
      <Tooltip title={"update " + Role[props.client].toLowerCase()}>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            m: 4,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: 400 }}>
            {props.client === Role.COMPANY && (
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  disabled
                  helperText={"name can not be updated"}
                  fullWidth
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                ></TextField>
              </Grid>
            )}
            {props.client === Role.CUSTOMER && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  ></TextField>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></TextField>
            </Grid>
          </Grid>
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            {"update " + Role[props.client].toString().toLowerCase()}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default UpdateClient;
