import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const PaypalPayment = () => {
  return (
    <div>
      <Alert
        severity="warning"
        className="h-28 flex justify-center items-center"
      >
        <AlertTitle>Paypal Method Unavaliable</AlertTitle>
        Paypal payment is not avaliable. choose another payment method.
      </Alert>
    </div>
  );
};

export default PaypalPayment;
