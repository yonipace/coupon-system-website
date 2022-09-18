import {
  Button,
  Box,
  Card,
  Container,
  FormLabel,
  Grid,
  Link,
  TextField,
  CardHeader,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { NavLink, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { Role } from "../../../Redux/Reducers/authSlice";
import useAuthService from "../../../Hooks/useAuthService";
import useNotificationService from "../../../Hooks/useNotificationService";
import useAlert from "../../../Hooks/useAlert";

const SignUp = () => {
  const [client, setClient] = useState(Role.CUSTOMER);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerClient } = useAuthService();
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await registerClient(
        client === Role.COMPANY
          ? { email, password, name: companyName }
          : { email, password, firstName, lastName },
        client
      );

      setAlert("Welcome!", "success");
      navigate("/home");
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card elevation={3} sx={{ p: 2 }}>
        <CardHeader title="Sign Up" />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Are you a Customer or a Company?
          </FormLabel>
          <RadioGroup
            row
            onChange={() => {
              setClient(
                client === Role.CUSTOMER ? Role.COMPANY : Role.CUSTOMER
              );
            }}
            value={client}
          >
            <FormControlLabel
              value={Role.CUSTOMER}
              control={<Radio />}
              label="Customer"
              sx={{ mr: 8 }}
            />
            <FormControlLabel
              value={Role.COMPANY}
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
        </FormControl>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            {client === Role.COMPANY && (
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
            {client === Role.CUSTOMER && (
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
            Sign Up
          </Button>
        </Box>
        <Link component={NavLink} to="/login" underline="hover">
          Already have an account? click here to login
        </Link>
      </Card>
    </Container>
  );
};

export default SignUp;
