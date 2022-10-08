import {
  TextField,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  CardHeader,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Role } from "../../../Redux/Reducers/authSlice";
import useAuthService from "../../../Hooks/useAuthService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState(Role.CUSTOMER);
  const { loginClient } = useAuthService();
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await loginClient({ email, password, role: Role[client] });
      setAlert("Welcome Back!", "success");
      navigate("/home");
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card elevation={3} sx={{ p: 2 }}>
        <CardHeader title="Login" />
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
          <FormControl sx={{ mt: 2 }}>
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
                sx={{ mr: 10 }}
              />
              <FormControlLabel
                value={Role.COMPANY}
                control={<Radio />}
                label="Company"
              />
            </RadioGroup>
          </FormControl>
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
        <Link component={RouterLink} to="/signup" underline="hover">
          First time? click here to sign up
        </Link>
      </Card>
    </Container>
  );
};

export default Login;
