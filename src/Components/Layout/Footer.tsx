import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";

const Footer = () => {
  const drawerHeight = "100px";

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          anchor="bottom"
          sx={{
            height: drawerHeight,
            flexShrink: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography>
              © Yonatan Pace - Final Project for Java-Full Stack course
            </Typography>
          </Toolbar>
          <Divider />
        </Drawer>
      </Box>
    </div>
  );
};

export default Footer;
