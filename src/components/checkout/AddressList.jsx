import {
  FaCheckCircle,
  FaHome,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserCheckOutAddress as setSelectedCheckoutAddress } from "../../store/actions";

const AddressList = ({ address, setSelectedAddress, setOpenAddressModal,setOpenDeleteModal }) => {
  const dispatch = useDispatch();

  const selectedAddressFromState = useSelector(
    (state) => state.auth.selectedUserCheckOutAddress
  );

  const handleEditAddress = (adr, e) => {
    e.stopPropagation();
    setSelectedAddress(adr);
    setOpenAddressModal(true);
  };

  const handleAddressSelection = (adr) => {
    dispatch(setSelectedCheckoutAddress(adr));
    setSelectedAddress(adr);
  };

  const onDeleteButtonHandler = (adr, e) => {
    e.stopPropagation();
    setSelectedAddress(adr);
    setOpenDeleteModal(true);
  };

  return (
    <div className="space-y-4">
      {address.map((adr) => {
        const isSelected =
          selectedAddressFromState?.addressId === adr.addressId;

        return (
          <div
            key={adr.addressId}
            onClick={() => handleAddressSelection(adr)}
            className={`relative p-6 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md group ${
              isSelected
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaHome className="text-gray-500" />
                  <span>
                    {adr.buildingName}, {adr.street}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>
                    {adr.city}, {adr.state}, {adr.country} - {adr.pincode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isSelected && (
                  <FaCheckCircle className="text-green-500 text-xl" />
                )}
                <FaEdit
                  onClick={(e) => handleEditAddress(adr, e)}
                  className="text-gray-400 hover:text-blue-500 cursor-pointer hidden group-hover:block"
                  title="Edit"
                />
                <FaTrash
                  onClick={(e) => onDeleteButtonHandler(adr, e)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer hidden group-hover:block"
                  title="Delete"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
