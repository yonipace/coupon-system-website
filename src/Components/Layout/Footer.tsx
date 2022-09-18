import { Box, CssBaseline, Divider, Drawer, Toolbar } from "@mui/material";

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
          <Toolbar>Footer</Toolbar>
          <Divider />
        </Drawer>
      </Box>
    </div>
  );
};

export default Footer;
