import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, TokenValues } from "../../Redux/Reducers/authSlice";
import { RootState } from "../../Redux/Store/Store";
import { getDetails } from "../../Service/DetailService";

const Header = () => {
  const state = useSelector((state: RootState) => state);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = token ? true : false;
  const clientDetails = getDetails();
  const clientName = clientDetails.name;
  const doLogOut = () => {
    dispatch(logout());
    //refresh to clear menu after loging out
    navigate("/login");
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
          {isLoggedIn && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={doLogOut}
              component={NavLink}
              to="/login"
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
