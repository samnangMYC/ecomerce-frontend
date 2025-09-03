import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { UserX } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { adminSellerColumn } from "../../helper/tableColumn";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSellerFilter } from "../../../hook/useSellerFilter";

const AdminSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const isLoading = false;

  const { seller, pagination } = useSelector((state) => state.auth);

  const emptySeller = !seller || seller.length === 0;

  useSellerFilter();

  const tableRecords = seller?.map((item) => ({
    id: item.id,
    username: item.username,
    email: item.email,
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        {/* Title */}
        <p className="font-semibold text-lg">All Seller </p>

        {/* Add Categories Button */}
        {/* <button
          type="button"
          // onClick={handleSave}
          className="flex idhover:cursor-pointer hover:cursor-pointer items-center gap-2 text-white bg-gradient-to-br from-indigo-600 to-indigo-500 
                                   hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-indigo-300 
                                   dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <MdAddShoppingCart size={18} />
          Add Seller
        </button> */}
      </div>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : emptySeller ? (
        <div className="flex flex-col items-center justify-center h-[80vh] py-10 text-gray-500">
          <UserX size={40} />
          <p className="mt-2 text-sm">No seller found</p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-2">
          <DataGrid
            className="w-full"
            rows={tableRecords}
            columns={adminSellerColumn(handleEdit, handleDelete)}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminSeller;
