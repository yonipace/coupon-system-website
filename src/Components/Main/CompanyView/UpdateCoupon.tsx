import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import useCompanyService from "../../../Hooks/useCompanyService";
import { Category, CouponModel } from "../../../Models/CouponModel";
import useNotificationService from "../../../Hooks/useNotificationService";
import useAlert from "../../../Hooks/useAlert";

const UpdateCoupon = (props: CouponModel) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [price, setPrice] = useState(props.price);
  const [amount, setAmount] = useState(props.amount);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const { updateCoupon } = useCompanyService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const categories = Object.keys(Category).filter((v) => !isNaN(Number(v)));

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateCoupon({
        id: props.id,
        title,
        description,
        amount,
        price,
        category,
        startDate,
        endDate,
        company: props.company,
      });
      setAlert("coupon updated successfully!", "success");
    } catch (err: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };
  return (
    <>
      <Tooltip title={"update coupon"}>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            m: 4,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: 400 }}>
            <Grid item xs={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) =>
                    setCategory(parseInt(e.target.value.toString()))
                  }
                >
                  {categories.map((k: any) => (
                    <MenuItem value={categories.indexOf(k)}>
                      {Category[categories.indexOf(k)].toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price ($)"
                variant="outlined"
                type="number"
                fullWidth
                onChange={(e) => setPrice(parseInt(e.target.value))}
                value={price}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                fullWidth
                onChange={(e) => setAmount(parseInt(e.target.value))}
                value={amount}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            {"update coupon"}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default UpdateCoupon;
