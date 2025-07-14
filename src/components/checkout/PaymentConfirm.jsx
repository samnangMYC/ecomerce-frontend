import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Skeleton from "../shared/Skeleton";
import { CheckCircle, XCircle } from "lucide-react";
import { stripePaymentConfirmation } from "../../store/actions";
import toast from "react-hot-toast";

const PaymentConfirm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.carts);
  const { selectedUserCheckOutAddress } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0 &&
      selectedUserCheckOutAddress
    ) {
      const sendData = {
        addressId: selectedUserCheckOutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful"
      };

      dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    } else {
      setLoading(false);
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart, selectedUserCheckOutAddress]);

  const isSuccess = redirectStatus === "succeeded";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {loading ? (
        <Skeleton className="h-[300px] w-full max-w-xl" />
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl space-y-6">
          <div className="text-center">
            {isSuccess ? (
              <>
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                <h2 className="text-2xl font-semibold mt-4">
                  Payment Successful
                </h2>
                <p className="text-gray-600">Your order has been placed.</p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-16 h-16 mx-auto" />
                <h2 className="text-2xl font-semibold mt-4">Payment Failed</h2>
                <p className="text-gray-600">
                  There was an issue processing your payment.
                </p>
              </>
            )}

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          {cart?.length > 0 && selectedUserCheckOutAddress && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <ul className="divide-y">
                {cart.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span className="text-gray-700">
                      {item.product?.title || "Item"}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      ${item.totalPrice?.toFixed(2) || "0.00"}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="text-md font-medium mt-4">Shipping To:</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedUserCheckOutAddress.name} -{" "}
                  {selectedUserCheckOutAddress.phone}
                  <br />
                  {selectedUserCheckOutAddress.fullAddress}
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/"
              className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirm;
