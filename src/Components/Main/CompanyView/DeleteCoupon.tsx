import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import useCompanyService from "../../../Hooks/useCompanyService";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

export interface DeleteCouponProps {
  id: number;
}

const DeleteCoupon = (props: DeleteCouponProps) => {
  const [open, setOpen] = useState(false);
  const { deleteCoupon } = useCompanyService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleComfirm = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await deleteCoupon(props.id);
      setAlert("coupon deleted successfully!", "success");
    } catch (err: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  return (
    <>
      <Tooltip title={"delete coupon"}>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Deleting a Coupon is a permanent action.
          <br /> Are you sure you want to delete it?
          <br />
          <Stack spacing={2} direction="row" sx={{ my: 1 }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleComfirm}
              value={props.id}
              variant="outlined"
            >
              Yes, I'm Sure
            </Button>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Not so sure anymore
            </Button>
          </Stack>
        </Alert>
      </Dialog>
    </>
  );
};

export default DeleteCoupon;
