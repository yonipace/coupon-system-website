import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Role } from "../../../Redux/Reducers/authSlice";
import { getDetails } from "../../../Service/DetailService";

const Home = () => {
  const clientDetails = getDetails();
  const role = clientDetails.role;
  const name = clientDetails.name;
  // const content = () => {
  //     if (role.toString() === Role[Role.ADMIN]){
  //     return "Welcome Admin!"
  //     }
  //     if (role.toString() === Role[Role.COMPANY) {
  //         return "Welcome " +
  //     }

  // }

  return (
    <div>
      <div>
        <Typography variant="h2">Welcome {name}!</Typography>
      </div>
    </div>
  );
};

export default Home;
