import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import Spinners from "../../shared/Spinners";
import { useDispatch } from "react-redux";
import { updateOrderStatusFromDashboard } from "../../../store/actions";
import toast from "react-hot-toast";

const ORDER_STATUS = [
  "Pending",
  "Delivered",
  "Processing",
  "Cancelled",
  "Shipped",
  "Accepted",
];

const UpdateOrderForm = ({ setOpen, selectedItem }) => {
  const [orderStatus, setOrderStatus] = useState(
    selectedItem?.status || "Accepted"
  );
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const updateOrderStatus = (e) => {
    e.preventDefault();
    if (!orderStatus) {
      setError("Order status is required");
    }
    const selectedId = selectedItem?.id;
    dispatch(
      updateOrderStatusFromDashboard(selectedId, orderStatus, toast, setLoader)
    );
  };
  return (
    <div className="p-6 flex flex-col h-full">
      <form
        className="flex flex-col flex-1 justify-between"
        onSubmit={updateOrderStatus}
      >
        <div className="space-y-4">
          <FormControl fullWidth variant="outlined" error={!!error}>
            <InputLabel id="order-status-label">Order Status</InputLabel>
            <Select
              labelId="order-status-label"
              value={orderStatus}
              label="Order Status"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              {ORDER_STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loader}
            variant="contained"
            color="primary"
          >
            {loader ? (
              <div className="flex gap-2 ">
                <Spinners className="text-white" />
                Loading..
              </div>
            ) : (
              "Updated"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
