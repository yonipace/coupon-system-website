import { Alert, AlertTitle, Dialog, Snackbar } from "@mui/material";

export interface AlertDataModel {
  open: boolean;
  severity: any;
  title: string;
  onClose?: any;
  content: any;
}

const AlertDialog = (props: AlertDataModel) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Alert severity={props.severity} onClose={props.onClose}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.content}
      </Alert>
    </Dialog>
  );
};

export default AlertDialog;
