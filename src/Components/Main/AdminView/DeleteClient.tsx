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
import useAdminService from "../../../Hooks/useAdminService";
import { Role } from "../../../Redux/Reducers/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

export interface DeleteClientProps {
  id: number;
  role: Role;
}

const DeleteClient = (props: DeleteClientProps) => {
  const [open, setOpen] = useState(false);
  const { deleteCompany, deleteCustomer } = useAdminService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleComfirm = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      if (props.role === Role.COMPANY) {
        await deleteCompany(props.id);
        setAlert("company deleted successfully!", "success");
      }
      if (props.role === Role.CUSTOMER) {
        await deleteCustomer(props.id);
        setAlert("customer deleted successfully!", "success");
      }
    } catch (e: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  return (
    <>
      <Tooltip title={"delete " + Role[props.role].toLowerCase()}>
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
          Deleting a {Role[props.role].toLowerCase()} is a permanent action.
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

export default DeleteClient;
