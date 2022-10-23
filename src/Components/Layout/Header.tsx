import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Reducers/authSlice";
import { RootState } from "../../Redux/Store/Store";
import { getDetails } from "../../Service/DetailService";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = token ? true : false;
  const clientDetails = getDetails();
  const clientName = clientDetails.name;
  const doLogOut = () => {
    dispatch(logout());
    //refresh to clear menu after loging out
    navigate("/");
    navigate(0);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h5" align="left" sx={{ flexGrow: 1 }}>
            {isLoggedIn ? clientName : "Coupon System"}
          </Typography>
          {!isLoggedIn && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="inherit"
                component={NavLink}
                to="/login"
              >
                Log In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={NavLink}
                to="/signup"
              >
                Sign Up
              </Button>
            </Stack>
          )}
          {isLoggedIn && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={doLogOut}
              component={NavLink}
              to="/"
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
