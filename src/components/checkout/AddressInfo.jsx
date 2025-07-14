import { use, useState } from "react";
import Skeleton from "../shared/Skeleton";
import { MapPinOff } from "lucide-react";
import AddressInfoModal from "./AddressInfoModal";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/actions";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";

const AddressInfo = ({ address = [] }) => {
  const noAddressExist = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.error);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
 
    if (!isLoading) {
      const delay = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000);

      return () => clearTimeout(delay); 
    } else {
      setDelayedLoading(true); 
    }
  }, [isLoading]);

  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };
  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal)
    );
  };
  return (
    <div>
      {noAddressExist ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
          <div className="flex flex-col items-center gap-3">
            <MapPinOff className="w-12 h-12 text-gray-400" />
            <h2 className="text-xl font-semibold">No Address Found</h2>
            <p className="text-sm text-gray-400">
              You haven’t added any addresses yet. Add one to complete
              purchase!!.
            </p>
            <button
              onClick={addNewAddressHandler}
              className="mt-4 px-4 py-2 bg-indigo-700 hover:cursor-pointer text-white rounded-lg hover:bg-indigo-800 transition"
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg max-w-md mx-auto ">
          <div className="flex justify-between bg-white items-center px-4 py-3 rounded-md shadow-sm">
            <h1 className="text-slate-800 text-2xl font-bold">
              Select Address
            </h1>

            {address.length > 0 && (
              <button
                onClick={addNewAddressHandler}
                className="p-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition duration-200"
                title="Add New Address"
              >
                <FaPlus className="w-5 h-5" />
              </button>
            )}
          </div>

          {delayedLoading ? (
            <div className="mt-6">
              <Skeleton />
            </div>
          ) : (
            <div className="mt-6">
              <AddressList
                address={address}
                setSelectedAddress={setSelectedAddress}
                setOpenAddressModal={setOpenAddressModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          )}
        </div>
      )}
      <AddressInfoModal
        address={selectedAddress}
        isOpen={openAddressModal}
        setIsOpen={setOpenAddressModal}
        children={
          <AddressForm
            address={selectedAddress}
            setOpenAddressModal={setOpenAddressModal}
          />
        }
      />
      <DeleteModal
        isOpen={openDeleteModal}
        loader={btnLoader}
        setIsOpen={setOpenDeleteModal}
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
