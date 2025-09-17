import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import InputField from "../shared/InputField";
import { addUpdateUserAddress } from "../../store/actions";
import { useState } from "react";
import { useEffect } from "react";
const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state) => state.error);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addAddressHandler = async (data) => {
    //console.log("Address submitted", data);
    dispatch(addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal));
    reset();
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("pincode", address?.pincode);
      setValue("country", address?.country);
    } else {
      console.log("Address not working");
    }
  }, [address]);


  return (
    <form className="space-y-3" onSubmit={handleSubmit(addAddressHandler)}>
      <InputField
        label="Street Address"
        required
        id="street"
        type="text"
        min={4}
        message="*Street Address is required"
        placeholder="Enter your street address"
        register={register}
        errors={errors}
      />

      <InputField
        label="Building Name"
        required
        id="buildingName"
        type="text"
        min={4}
        message="*Building Name is required"
        placeholder="Enter your building name"
        register={register}
        errors={errors}
      />

      <InputField
        label="City"
        required
        id="city"
        type="text"
        min={4}
        message="*City is required"
        placeholder="Enter your city"
        register={register}
        errors={errors}
      />

      <InputField
        label="State"
        required
        id="state"
        type="text"
        min={4}
        message="*State is required"
        placeholder="Enter your state"
        register={register}
        errors={errors}
      />

      <InputField
        label="Postal Code"
        required
        id="pincode"
        type="text"
        min={6}
        message="*Postal Code is required"
        placeholder="Enter your postal code"
        register={register}
        errors={errors}
      />

      <InputField
        label="Country"
        required
        id="country"
        type="text"
        min={4}
        message="*Country is required"
        placeholder="Enter your country"
        register={register}
        errors={errors}
      />

      {
        errorMessage && (
          <p className="text-red-500">
            {errorMessage}
          </p>
        )
      }

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg hover:cursor-pointer  font-semibold text-white transition 
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 
                        hover:brightness-110 disabled:opacity-50`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-4">
            <Spinners /> Saving...
          </div>
        ) : (
          "Save"
        )}
      </button>
      <button
        type="button"
        onClick={() => setOpenAddressModal(false)}
        className={`w-full py-3 px-4 rounded-lg hover:cursor-pointer border hover:bg-gray-200 font-semibold text-black `}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddAddressForm;
