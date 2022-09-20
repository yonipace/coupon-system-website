import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { red, yellow, blue, green, orange, purple } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SyntheticEvent, useState } from "react";
import { Category, CouponModel } from "../../../Models/CouponModel";
import { CardActionArea, Icon } from "@mui/material";
import useCustomerService from "../../../Hooks/useCustomerService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const CouponCard = (props: CouponModel) => {
  const [open, setOpen] = useState(false);
  const { purchaseCoupon } = useCustomerService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const purchaseHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await purchaseCoupon(props);
      setAlert("coupon purchased successfully!", "success");
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  const avatarColors = [
    yellow[700],
    red[700],
    orange[700],
    blue[700],
    green[700],
    purple[700],
  ];

  return (
    <div>
      <Card sx={{ m: 2, maxWidth: "md", "text-align": "left" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: avatarColors[parseInt(Category[props.category])],
              }}
            >
              {props.title.toUpperCase().slice(0, 1)}
            </Avatar>
          }
          action={
            <Tooltip title="purchase coupon">
              <IconButton onClick={purchaseHandler}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
          }
          title={props.title}
          subheader={props.category.toString().toLowerCase()}
        />

        <CardContent>
          <Typography variant="body2" sx={{ my: 1 }}>
            Price: {props.price + "$"}
          </Typography>

          <Typography variant="body2" color="text.body2">
            Description: {props.description}
          </Typography>
        </CardContent>

        <CardActionArea onClick={() => setOpen(!open)} sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Details</Typography>
            <Icon>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Icon>
          </Stack>
        </CardActionArea>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1">
                issued by: {props.company.name}
              </Typography>
              <Divider />
              <Typography variant="body2">Amount: {props.amount}</Typography>
              <Divider />
              <Typography variant="body2">
                Start Date: {props.startDate}
              </Typography>
              <Divider />
              <Typography variant="body2">End Date: {props.endDate}</Typography>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
export default CouponCard;
