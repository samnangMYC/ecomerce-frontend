import Skeleton from "@mui/material/Skeleton";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }
      console.log(
        "Return URL being sent:",
        `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`
      );

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirm`,
        },
      });

      if (error) {
        console.error("Stripe confirm error:", error);
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mb-22 max-w-lg mx-auto p-4 border rounded-md shadow-sm"
    >
      <h1 className="font-semibold text-2xl">Payment Information</h1>

      {!clientSecret ? (
        <Skeleton height={100} />
      ) : (
        <PaymentElement options={paymentElementOptions} />
      )}

      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`h-12 w-full rounded-md text-white mt-2 transition-all ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-black hover:bg-gray-900 cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : `Pay $${Number(totalPrice).toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
