import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Skeleton from "../shared/Skeleton";
import { CheckCircle, XCircle } from "lucide-react";
import { stripePaymentConfirmation } from "../../store/actions";
import toast from "react-hot-toast";
import ErrorPage from "../shared/ErrorPage";

const PaymentConfirm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.carts);
   const { errorMessage } = useSelector((state) => state.error);

   const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0 &&
      selectedUserCheckoutAddress
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };
      console.log(selectedUserCheckoutAddress);
      console.log(sendData);

      dispatch(
        stripePaymentConfirmation(sendData, setLoading, toast)
      );
    } 
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  const isSuccess = redirectStatus === "succeeded";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {loading ? (
        <Skeleton className="h-[300px] w-full max-w-xl" />
      ) : errorMessage ? (
          <ErrorPage message={errorMessage}/>
      ) :(
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl space-y-6">
          <div className="text-center">
            {isSuccess ? (
              <>
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                <h2 className="text-2xl font-semibold mt-4">
                  Payment Successful
                </h2>
                <p className="text-gray-600">
                  Thanks for purchase, Your order has been placed!
                </p>
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

          {cart?.length > 0 && selectedUserCheckoutAddress && (
            <div className="bg-white shadow-md p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h3>

              <ul className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="py-3 flex justify-between items-center"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.productName || "Item"}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      ${item.specialPrice?.toFixed(2) || "0.00"}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart
                      .reduce((sum, item) => sum + (item.specialPrice || 0), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-gray-800 font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      cart.reduce(
                        (sum, item) => sum + (item.specialPrice || 0),
                        0
                      ) + 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-800">
                  Shipping To:
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedUserCheckoutAddress.buildingName} -{" "}
                  {selectedUserCheckoutAddress.city}
                  <br />
                  {selectedUserCheckoutAddress.street}
                  <br />
                  {selectedUserCheckoutAddress.state}
                  <br />
                  {selectedUserCheckoutAddress.country}
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
