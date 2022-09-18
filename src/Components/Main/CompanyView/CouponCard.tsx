import { Card, CardHeader } from "@mui/material";
import React from "react";
import { CouponModel } from "../../../Models/CouponModel";

const CouponCard = (props: CouponModel) => {
  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader={props.category.toString().toLowerCase()}
      />
    </Card>
  );
};

export default CouponCard;
