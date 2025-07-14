import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import Button from "@mui/material/Button";
import Skeleton from "../shared/Skeleton";
import ErrorPage from "../shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";

const CheckOut = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.error);
  const { cart } = useSelector((state) => state.carts);
  const { address, selectedUserCheckOutAddress } = useSelector(
    (state) => state.auth
  );
  const { paymentMethod } = useSelector((state) => state.payment);

  const totalPrice = cart?.reduce((acc, item) => {
    return acc + item.specialPrice * item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getUserAddresses());
  //  console.log(totalPrice);
  }, [dispatch]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Handle place order logic here
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Stepper */}
      <div className="bg-white shadow-sm py-6 md:px-14 top-0 sticky z-40">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Step Content */}
      {isLoading ? (
        <div className="">
          <Skeleton />
        </div>
      ) : (
        <div className="py-10 px-4 md:px-14 max-w-5xl mx-auto">
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && (
            <OrderSummary
              address={selectedUserCheckOutAddress}
              cart={cart}
              paymentMethod={paymentMethod}
              totalPrice={totalPrice}
            />
          )}
          {activeStep == 3 && (
            <>
              {paymentMethod == "Stripe" ? (
                <StripePayment totalPrice={totalPrice} />
              ) : (
                <PaypalPayment />
              )}
            </>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-between bg-white px-4 md:px-14 items-center fixed z-50 h-20 bottom-0 left-0 right-0 border-t">
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={
            errorMessage ||
            (activeStep === 0
              ? !selectedUserCheckOutAddress
              : activeStep === 1
              ? !paymentMethod
              : false)
          }
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "Place Order" : "Next"}
        </Button>
      </div>

      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default CheckOut;
