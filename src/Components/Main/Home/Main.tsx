import { Container, Toolbar, Typography } from "@mui/material";
import Routing from "../../../Routes/Routing";
import SignUp from "../LoginView/SignUp";

const Main = () => {
  return (
    <div>
      <Container sx={{ ml: "240px" }}>
        <Toolbar sx={{ mb: 2 }} />
        <Routing />
      </Container>
    </div>
  );
};

export default Main;
