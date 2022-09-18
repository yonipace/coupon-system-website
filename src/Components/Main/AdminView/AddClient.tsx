import { Box, Button, Dialog, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import useAdminService from "../../../Hooks/useAdminService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";
import { Role } from "../../../Redux/Reducers/authSlice";

export interface AddClientFormProps {
  open?: boolean;
  role: Role;
}

const AddClient = (props: AddClientFormProps) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addCompany, addCustomer } = useAdminService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (props.role === Role.COMPANY) {
        await addCompany({ name: companyName, email, password });
        setAlert("company added successfully!", "success");
      }
      if (props.role === Role.CUSTOMER) {
        await addCustomer({ firstName, lastName, email, password });
        setAlert("customer added successfully!", "success");
      }
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {"add " + Role[props.role].toString().toLowerCase()}
      </Button>
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
            {props.role === Role.COMPANY && (
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                ></TextField>
              </Grid>
            )}
            {props.role === Role.CUSTOMER && (
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
            {"add new " + Role[props.role].toString().toLowerCase()}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default AddClient;
