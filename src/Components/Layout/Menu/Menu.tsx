import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";

import {
  adminMenuItems,
  companyMenuItems,
  customerMenuItems,
  MenuItemModel,
} from "./MenuItems";
import { NavLink } from "react-router-dom";
import { getDetails } from "../../../Service/DetailService";
import { Role } from "../../../Redux/Reducers/authSlice";
import { useEffect, useState } from "react";
import AddCoupon from "../../Main/CompanyView/AddCoupon";

const Menu = () => {
  const drawerWidth = 240;
  const state = useSelector((state: RootState) => state);
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);

  useEffect(() => {
    const clientDetails = getDetails();
    const role = clientDetails.role;
    if (!token) {
      return;
    }
    if (role.toString() === Role[Role.ADMIN]) {
      setMenuItems(adminMenuItems);
      return;
    }
    if (role.toString() === Role[Role.COMPANY]) {
      setMenuItems(companyMenuItems);
      return;
    }
    if (role.toString() === Role[Role.CUSTOMER]) {
      setMenuItems(customerMenuItems);
      return;
    }
  }, [state.auth.isLoggedIn, isLoggedIn, token]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem disablePadding key={item.text}>
                <ListItemButton
                  component={NavLink}
                  to={item.link}
                  onClick={() => {}}
                >
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Menu;
