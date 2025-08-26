import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/actions";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISTABLE_KEY);

const StripePayment = ({totalPrice}) => {
  const { clientSecret, user } = useSelector((state) => state.auth);
 // const { isLoading, errorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const price = 223;

 // console.log("Client secret used:", clientSecret);

  useEffect(() => {
    if (!clientSecret && user) {
      dispatch(createStripePaymentSecret(price));
    }
  }, [clientSecret, user]);

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
