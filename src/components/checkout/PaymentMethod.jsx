import React, { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.payment);
  const { isLoading, errorMessage } = useSelector((state) => state.error);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      dispatch(createUserCart(sendCartItems));

    }
    console.log()
  }, [dispatch, cartId]);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };
  return (
    <div className="flex justify-center">
      <FormControl className="space-y-3">
        <h1 className="font-bold text-2xl">Select Payment Method</h1>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Payment Intergation With
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" />}
            label="Stripe"
          />
          <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        </RadioGroup>
      </FormControl>

      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default PaymentMethod;
