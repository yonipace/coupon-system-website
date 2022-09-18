import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import useAdminService from "../../../Hooks/useAdminService";
import { Role } from "../../../Redux/Reducers/authSlice";
import { Category } from "../../../Models/CouponModel";
import useCompanyService from "../../../Hooks/useCompanyService";
import { parse } from "path";
import useAlert from "../../../Hooks/useAlert";
import useNotificationService from "../../../Hooks/useNotificationService";

const AddCoupon = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { addCoupon } = useCompanyService();
  const { setAlert } = useAlert();
  const { getErrorMessage } = useNotificationService();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await addCoupon({
        title,
        description,
        amount,
        price,
        category,
        startDate,
        endDate,
      });
      setAlert("coupon added successfully!", "success");
      setTitle("");
      setDescription("");
      setAmount(0);
      setPrice(0);
      setCategory(0);
      setStartDate("");
      setEndDate("");
    } catch (err: any) {
      setAlert(getErrorMessage(e), "error");
    }
  };

  const categories = Object.keys(Category).filter((v) => !isNaN(Number(v)));

  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {"add coupon"}
      </Button>
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
                  label="Category"
                  onChange={(e) =>
                    setCategory(parseInt(e.target.value.toString()))
                  }
                  value={category}
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
            {"add new coupon"}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default AddCoupon;
